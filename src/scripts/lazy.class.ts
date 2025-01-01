import { isVue2, VNode } from 'vue-demi';
import { lazyOptionsObj, observerOptionsObj } from './lazy-observer-options';
import { EImgCustAttr, ELifecycle, EmitFunc, ILazyOptions, TModelValue } from './types';
import { deepCopy } from './utils';

/**
 * @description - 图片懒加载实现类
 */
export class Lazy {
  /**
   * @property {ILazyOptions} _lazyOptions - 默认懒加载配置选项
   * @memberof Lazy
   */
  private _lazyOptions: ILazyOptions = deepCopy(lazyOptionsObj);

  /**
   * @property {IntersectionObserverInit} _observerOptions - IntersectionObserver 监听目标进入可视化实例的默认初始化参数
   * @memberof Lazy
   */
  private _observerOptions: IntersectionObserverInit = deepCopy(observerOptionsObj);

  // 创建用于实现懒加载图片监听器的 IntersectionObserver 类的实例对象
  private _imgObserver: IntersectionObserver | null = null;

  // 组件递增实例ID
  static instId = 0;

  // 本组件默认插槽内的 img 节点ID
  private _imgId = 1;

  // 保存 <img> 标签里 data-img-id 属性值的数组
  private _dataImgIdList: string[] = [];

  /**
   * @description - 构造函数
   * @param lazyOptions
   * @param observerOptions
   * @memberof Lazy
   */
  constructor(lazyOptions: ILazyOptions, observerOptions: IntersectionObserverInit) {
    Lazy.instId++;
    this._lazyOptions = Object.assign(this._lazyOptions, lazyOptions);
    this._observerOptions = Object.assign(this._observerOptions, observerOptions);
  }

  /**
   * @description - 循环递归读取插槽中的 img 标签的 vnode，替换原来的 src 属性为 loadingImg，并将原图src设置到 data-orig-src 属性中
   * @param vnodes - slot 中的 html 虚拟节点
   * @param modelValue - 父组件传过来的双向梆定值，用于支持使用 v-html 指令梆定 html 字符串（或数组）变量进行渲染
   * @param emits - defineEmits 宏接收的父组件传过来的双向梆定事件调用函数
   * @memberof Lazy
   * @returns
   */
  public setImgSrcToLoadingImg(
    vnodes: VNode[],
    modelValue: string | TModelValue | undefined,
    // 兼容 Vue2 写法的自定义事件 chgImgList 更新双向梆定变量 imgList
    emits: EmitFunc
  ): string[] {
    // 如果插槽有节点内容
    if (Array.isArray(vnodes) && vnodes.length > 0) {
      // 设置在每个 img 标签中自定义属性 data-img-id 中的唯一值 = 本组件实例递增ID值 + img 节点ID，如：inst1-1
      let dataImgId = '';
      // 支持如果 vnode 对应的标签使用了 v-html 内置指令进行渲染 html 内容，则使用正则表达式获取指令值内的所有 img 标签
      const imgHtmlReg = new RegExp('<\\s*img\\s+src\\s*=\\s*.*(\\/)?\\s*>', 'gi');
      // 【支持筛选 v-html 指令中的 img 标签内容】：如果 vnode 使用了 v-html 指令，则保存指令内所有 img 标签条目
      let imgsInHtml: string[] | null = null;
      // 如果使用了内置的 v-html 指令梆定的值是通过 html 字符串数组通过 v-for 进行渲染的，必须要调用 emits 反向
      // 修改梆定值，否则无法实现懒加载效果；
      // 记录每个 html 数组元素，最后再调用 emits('update:modelValue', modelHtmlArr) 反向修改梆定变量
      let modelHtmlIdx = 0;
      let modelHtmlArr: TModelValue = [];

      // 【重点】Vue2 不支持 emit(update:modelValue') 触发事件，改用 emit('chgImgList') 自定义事件
      const emitModelValueName = isVue2 ? 'chgImgList' : 'update:modelValue';

      // 开始循环遍历处理插槽的每个 vnode
      vnodes.forEach((vnode: any) => {
        // 如果插槽节点是单节点，没有子节点
        if (!vnode.children && typeof vnode.children !== 'string') {
          // 【重点】Vue2/3 需分别判断 vnode 的 attrs/props 属性
          const vnodeProps = isVue2 ? vnode?.data?.attrs : vnode.props;
          // 【重点】Vue2/3 需分别判断 vnode 的 innerHTML 属性，
          // Vue2 为 vnode.data.domProps.innerHTML，Vue3 为 vnode.props.innerHTML
          const vnodeInnerHTMLObj = isVue2 ? vnode?.data?.domProps : vnode.props;
          // 【重点】Vue2/3 需分别判断 vnode 的标签类型是哪一种 html 标签
          const vnodeTag = isVue2 ? vnode.tag : vnode.type;

          // 如果插槽节点是 img 节点，一般如果是 img 标签，都会存在 vnode.props（Vue3）或 vnode.data.attrs（Vue2）属性，
          // 所以这里只需要判断是 img 标签也可以
          if (vnodeTag === 'img' && vnodeProps) {
            // 在 img 节点上设置的自定义属性 data-img-id 的值
            dataImgId = `inst${Lazy.instId}-${this._imgId++}`;
            vnodeProps[EImgCustAttr.IMG_ID] = dataImgId;
            // 记录添加的节点ID到列表
            this._dataImgIdList.push(dataImgId);
            // 设置原图到自定义 data-orig-src 属性中
            vnodeProps[EImgCustAttr.ORIG_SRC] = vnodeProps.src;
            // 设置图片src属性为加载中的图片
            vnodeProps.src = this._lazyOptions.loadingImg;
          } else if (
            vnodeInnerHTMLObj?.innerHTML &&
            (imgsInHtml = vnodeInnerHTMLObj?.innerHTML.match(imgHtmlReg))
          ) {
            // console.log('imgsInHtml:', imgsInHtml, 'vnode:', vnode);
            // 如果 vnode 节点对应的 html 标签使用了 v-html 内置指令（vnode.props存在innerHTML属性），
            // 则应筛选出指令值内使用到的所有 <img> 标签的内容，并更改该 vnode 的 props.src 属性值为 loadingImg
            imgsInHtml.forEach((img: string) => {
              // 在 img 节点上设置的自定义属性 data-img-id 的值
              dataImgId = `inst${Lazy.instId}-${this._imgId++}`;
              // 记录添加的节点ID到列表
              this._dataImgIdList.push(dataImgId);
              // 为 img html 标签字符串添加的 data-img-id 自定义属性
              const dataIdAttr = `${EImgCustAttr.IMG_ID}="${dataImgId}"`;
              // 在 img html 标签字符串获取原 src 属性值
              const srcVal = img.match(/\s*src\s*=\s*['"`]?(.*)['"`].?/i)![1]; // .?杜绝贪婪匹配多次，只匹配一次
              // 为 img html 标签字符串添加的 data-orig-src 自定义属性
              const origSrcAttr = `${EImgCustAttr.ORIG_SRC}="${srcVal}"`;
              // 在 img 标签字符串添加以上两个自定义属性
              let newImg = img.replace(/((\/?)\s*>)/, ` ${dataIdAttr} ${origSrcAttr} $1`);
              // 将 img 标签字符串中的 src 属性值替换为 loadingImg
              newImg = newImg.replace(srcVal, this._lazyOptions.loadingImg!);
              // console.log('origImg:', img, 'newImg:', newImg);
              // 替换使用了 v-html 指令的 vnode.props.innerHTML 里原来的 img 标签内容为以上替换后新的 img 标签内容
              vnodeInnerHTMLObj.innerHTML = vnodeInnerHTMLObj.innerHTML.replace(img, newImg);
            });
            // 如果有传 v-model/modelValue
            if (modelValue) {
              if (typeof modelValue === 'string') {
                // 如果双向梆定的变量是字符串，直接一次性调用 emits 反向修改梆定变量即可
                emits(emitModelValueName, vnodeInnerHTMLObj.innerHTML);
              } else if (Array.isArray(modelValue)) {
                // 如果双向梆定的变量是字符串数组，需要每次合并到数组中，最后（以下）再调用 emits 一次性反向修改梆定变量
                modelHtmlArr[modelHtmlIdx] = {
                  key: modelValue[modelHtmlIdx].key,
                  htmlStr: vnodeInnerHTMLObj.innerHTML,
                };
                modelHtmlIdx++;
              }
            }
            console.log('vnodeInnerHTMLObj.innerHTML:', vnodeInnerHTMLObj.innerHTML);
            console.log('modelHtmlArr:', JSON.stringify(modelHtmlArr));
          }
        } else {
          // 否则插槽节点有子节点
          this.setImgSrcToLoadingImg(vnode.children as VNode[], modelValue, emits);
        }
      });
      // 如果双向梆定的变量是字符串数组，调用 emits 一次性反向修改梆定变量
      modelHtmlArr.length && emits(emitModelValueName, modelHtmlArr);
    }

    // 返回已递归处理的插槽内的 img 标签对应的 data-img-id 属性值
    return this._dataImgIdList;
  }

  /**
   * @description - 创建用于实现懒加载图片，监听图片是否已经进入设置的交叉比例可视区的 IntersectionObserver 类的实例对象
   * @memberof Lazy
   * @returns
   */
  public createImgObserver(): IntersectionObserver {
    this._imgObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        // entries 是所有被监听的 HTML DOM 对象的数组列表，
        // observer 是监听实例对象，同 this._imgObserver。

        // 循环判断每个监听项，这个回调函数会在以下执行 this._imgObserver.observer(target) 方法后生效，
        // 拖动滚动条时，就会触发执行这个回函进行判断图片是否已进入可视区
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (this._lazyOptions.delay! > 0) {
              await this._delayIntersectionCallback(entry);
            } else {
              this._intersectionCallback(entry);
            }
          }
        });
      },
      this._observerOptions
    );

    // 返回 IntersectionObserver 实例对象给组件的 onMounted 钩子函数中，循环遍历监听需要懒加载的图片
    return this._imgObserver;
  }

  /**
   * @description - 对图片进入可视区的处理回调函数
   * @param entry
   * @memberof Lazy
   * @returns
   */
  private _intersectionCallback(entry: IntersectionObserverEntry): void {
    // 如果图片已进入可视区
    if (entry.isIntersecting) {
      // 图片进入可视区后，停止对图片的 observer，无论是否加载成功，都停止对图片的再次监听，防止消耗性能
      this._imgObserver?.unobserve(entry.target);

      // 修改图片未进入可视区前（mounted勾子函数中）设置的 src=loadingImg，更改为 src=src 原来真实的图片地址，实现懒加载效果
      this._setImgSrc(entry.target as HTMLImageElement);
    }
  }

  /**
   * @description - 对图片进入可视区的延迟处理回调函数
   * @param entry
   * @memberof Lazy
   * @returns {Promise<void>}
   */
  private _delayIntersectionCallback(entry: IntersectionObserverEntry): Promise<void> {
    return new Promise((resolve, reject) => {
      if (entry.isIntersecting) {
        // 如果进入可视区，设置加载延迟器
        // 如果延迟加载正在生效，则直接返回
        if (entry.target.hasAttribute(EImgCustAttr.TIMEOUT_ID)) return;

        // 否则开启加载延迟器
        let timeoutId = setTimeout(() => {
          this._intersectionCallback(entry);
          // 执行完延迟加载后，清除元素的延迟标签属性
          entry.target.removeAttribute(EImgCustAttr.TIMEOUT_ID);
        }, this._lazyOptions.delay);
        entry.target.setAttribute(EImgCustAttr.TIMEOUT_ID, String(timeoutId));
      } else {
        // 否则没有进入可视区
        // 针对刚进入可视区时，加载延迟器还没有到时间执行，又离开了可视区的情况，须清除加载延迟器
        this.clearLazyTimeout(entry.target);
      }
    });
  }

  /**
   *
   * @param imgEl
   * @memberof Lazy
   * @returns
   */
  private _setImgSrc(imgEl: HTMLImageElement): void {
    if (imgEl.hasAttribute(EImgCustAttr.ORIG_SRC)) {
      // 首次执行该 _setImgSrc 方法时，prevSrc（上一个设置的src）是组件在 beforeMount 钩子里设置的 loadingImg
      let prevSrc = imgEl.getAttribute('src');
      // 获取图片原来真实的 src
      let origSrc = imgEl.getAttribute(EImgCustAttr.ORIG_SRC);
      if (prevSrc !== origSrc) {
        // 如果有传图片加载中状态的回调函数，则执行它
        this._lifecycle(ELifecycle.LOADING, imgEl);
        imgEl.setAttribute('src', origSrc!);
      }
      // 监听图片的加载状态，传入 img.onload 和 image.onerror 的回调函数
      this._listenImgStatus(
        imgEl,
        () => {
          // 图片加载成功的回调函数
          // 如果不是在以下加载失败的回调中设置图片的 src 为 errorImg，
          // 才执行用户传入的或默认的加载完成的函数
          if (imgEl.getAttribute('src') !== this._lazyOptions.errorImg) {
            this._lifecycle(ELifecycle.LOADED, imgEl);
          }
        },
        () => {
          // 图片加载失败的回调函数
          // 停止 observer 对该图片的所有监听
          this._imgObserver?.unobserve(imgEl);
          // 执行用户传入的或默认的加载失败的函数
          this._lifecycle(ELifecycle.ERROR, imgEl);

          // 如果有传加载失败的图片url（其实没传也配置了默认值）
          if (this._lazyOptions.errorImg) {
            const currentImgSrc = imgEl.getAttribute('src');
            // 如果当前图片的 src 不是错误图片的 url，则设置显示加载失败的错误图片
            if (currentImgSrc !== this._lazyOptions.errorImg) {
              imgEl.setAttribute('src', this._lazyOptions.errorImg);
            }
          }

          // 控制台打印加载失败信息
          console.error(`图片加载失败，图片 url 地址是：${imgEl.getAttribute(EImgCustAttr.ORIG_SRC)}`);
        }
      );
    }
  }

  /**
   * @description - 监听图片加载成功/失败状态的回调函数
   * @param imgEl
   * @param successCallback
   * @param errorCallback
   * @memberof Lazy
   * @returns
   */
  private _listenImgStatus(
    imgEl: HTMLImageElement,
    successCallback: ((this: GlobalEventHandlers, ev: Event) => any) | null,
    errorCallback: OnErrorEventHandler
  ): void {
    imgEl.onload = successCallback;
    imgEl.onerror = errorCallback;
  }

  /**
   * @description - 清除加载延迟器
   * @param imgEl - 懒加载图片元素对象
   */
  public clearLazyTimeout(imgEl: HTMLImageElement | Element): void {
    // 针对以下情况，须清除加载延迟器：
    // 1、刚进入可视区时，加载延迟器还没有到时间执行，又离开了可视区的情况；
    // 2、组件被 onBeforeMount 时
    if (imgEl.hasAttribute(EImgCustAttr.TIMEOUT_ID)) {
      // 离开可视区后，清除还在生效的加载延迟器和元素的延迟标签属性
      clearTimeout(Number(imgEl.getAttribute(EImgCustAttr.TIMEOUT_ID)));
      imgEl.removeAttribute(EImgCustAttr.TIMEOUT_ID);
    }
  }

  /**
   * @description - 判断如果存在图片加载状态的回调函数，则执行它
   * @param lifecycle
   * @param imgEl
   * @memberof Lazy
   * @returns
   */
  private _lifecycle(lifecycle: ELifecycle, imgEl: HTMLImageElement): void {
    const { lifeFunc } = this._lazyOptions;
    switch (lifecycle) {
      // 判断是否执行图片加载中状态的回调函数
      case ELifecycle.LOADING:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADING);
        // 如果加载中状态的回调函数存在，则执行它
        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADING] === 'function') {
          lifeFunc[ELifecycle.LOADING]?.(imgEl);
        }
        break;
      // 判断是否执行图片加载完成状态的回调函数
      case ELifecycle.LOADED:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADED);
        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADED] === 'function') {
          lifeFunc[ELifecycle.LOADED]?.(imgEl);
        }
        break;
      // 判断是否执行图片加载失败状态的回调函数
      case ELifecycle.ERROR:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.ERROR);
        if (lifeFunc && typeof lifeFunc[ELifecycle.ERROR] === 'function') {
          lifeFunc[ELifecycle.ERROR]?.(imgEl);
        }
        break;
      default:
        break;
    }
  }
}
