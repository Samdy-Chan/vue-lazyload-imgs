import { isVue2, isVue3, VNode } from 'vue-demi';
import { lazyOptionsObj, observerOptionsObj } from './lazy-observer-options';
import { EImgCustAttr, ELifecycle, EmitFunc, ILazyOptions } from './types';
import { deepCopy } from './utils';

export class Lazy {
  private _lazyOptions: ILazyOptions = deepCopy(lazyOptionsObj);

  private _observerOptions: IntersectionObserverInit = deepCopy(observerOptionsObj);

  private _htmlFieldName: string | undefined;

  private _imgObserver: IntersectionObserver | null = null;

  static instId = 0;

  private _imgId = 1;

  private _dataImgIdList: string[] = [];

  private _logMsgPrefix = '[vue-lazyload-imgs]:';

  private _modelHtmlIdx = 0;
  private _modelHtmlArr: object[] = [];

  constructor(
    lazyOptions: ILazyOptions,
    observerOptions: IntersectionObserverInit,
    htmlFieldName: string | undefined
  ) {
    Lazy.instId++;
    this._lazyOptions = Object.assign(this._lazyOptions, lazyOptions);
    this._observerOptions = Object.assign(this._observerOptions, observerOptions);
    this._htmlFieldName = htmlFieldName;
  }

  public setImgSrcToLoadingImg(
    vnodes: VNode[],
    modelValue: string | object[] | undefined,
    emits: EmitFunc
  ): string[] {
    if (Array.isArray(vnodes) && vnodes.length > 0) {
      let dataImgId = '';

      const imgHtmlReg = new RegExp('<\\s*img\\s+src\\s*=\\s*.*(\\/)?\\s*>', 'gi');

      let imgsInHtml: string[] | null = null;

      vnodes.forEach((vnode: any) => {
        if (!vnode.children && typeof vnode.children !== 'string') {
          const vnodeProps = isVue2 ? vnode?.data?.attrs : vnode.props;

          const vnodeInnerHTMLObj = isVue2 ? vnode?.data?.domProps : vnode.props;

          const vnodeTag = isVue2 ? vnode.tag : vnode.type;

          if (vnodeTag === 'img' && vnodeProps) {
            dataImgId = `inst${Lazy.instId}-${this._imgId++}`;
            vnodeProps[EImgCustAttr.IMG_ID] = dataImgId;

            this._dataImgIdList.push(dataImgId);

            vnodeProps[EImgCustAttr.ORIG_SRC] = vnodeProps.src;

            vnodeProps.src = this._lazyOptions.loadingImg;
          } else if (
            vnodeInnerHTMLObj?.innerHTML &&
            (imgsInHtml = vnodeInnerHTMLObj?.innerHTML.match(imgHtmlReg))
          ) {
            imgsInHtml.forEach((img: string) => {
              dataImgId = `inst${Lazy.instId}-${this._imgId++}`;

              this._dataImgIdList.push(dataImgId);

              const dataIdAttr = `${EImgCustAttr.IMG_ID}="${dataImgId}"`;

              const srcVal = img.match(/\s*src\s*=\s*['"`]?(.*)['"`].?/i)![1];

              const origSrcAttr = `${EImgCustAttr.ORIG_SRC}="${srcVal}"`;

              let newImg = img.replace(/((\/?)\s*>)/, ` ${dataIdAttr} ${origSrcAttr} $1`);

              newImg = newImg.replace(srcVal, this._lazyOptions.loadingImg!);

              vnodeInnerHTMLObj.innerHTML = vnodeInnerHTMLObj.innerHTML.replace(img, newImg);
            });

            if (modelValue) {
              if (isVue3 && typeof modelValue === 'string') {
                emits('update:modelValue', vnodeInnerHTMLObj.innerHTML);
              } else if (Array.isArray(modelValue)) {
                if (this._htmlFieldName) {
                  this._modelHtmlArr[this._modelHtmlIdx] = {
                    ...modelValue[this._modelHtmlIdx],
                    [this._htmlFieldName]: vnodeInnerHTMLObj.innerHTML,
                  };

                  this._modelHtmlIdx++;
                } else if (isVue3) {
                  console.error(`${this._logMsgPrefix} The Props htmlFieldName cannot be empty! 
Please specify, for example:
<LazyLoadImgs htmlFieldName="content">Some HTML tags</LazyLoadImgs>`);
                  return;
                }
              }
            }

            console.log('modelHtmlArr:', JSON.stringify(this._modelHtmlArr));
          }
        } else {
          this.setImgSrcToLoadingImg(vnode.children as VNode[], modelValue, emits);
        }
      });

      if (isVue3 && this._modelHtmlArr.length && this._htmlFieldName) {
        emits('update:modelValue', this._modelHtmlArr);
      }
    }

    return this._dataImgIdList;
  }

  public createImgObserver(): IntersectionObserver {
    this._imgObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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

    return this._imgObserver;
  }

  private _intersectionCallback(entry: IntersectionObserverEntry): void {
    if (entry.isIntersecting) {
      this._imgObserver?.unobserve(entry.target);

      this._setImgSrc(entry.target as HTMLImageElement);
    }
  }

  private _delayIntersectionCallback(entry: IntersectionObserverEntry): Promise<void> {
    return new Promise((resolve, reject) => {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute(EImgCustAttr.TIMEOUT_ID)) return;

        let timeoutId = setTimeout(() => {
          this._intersectionCallback(entry);
          entry.target.removeAttribute(EImgCustAttr.TIMEOUT_ID);
        }, this._lazyOptions.delay);
        entry.target.setAttribute(EImgCustAttr.TIMEOUT_ID, String(timeoutId));
      } else {
        this.clearLazyTimeout(entry.target);
      }
    });
  }

  private _setImgSrc(imgEl: HTMLImageElement): void {
    if (imgEl.hasAttribute(EImgCustAttr.ORIG_SRC)) {
      let prevSrc = imgEl.getAttribute('src');
      let origSrc = imgEl.getAttribute(EImgCustAttr.ORIG_SRC);

      if (prevSrc !== origSrc) {
        this._lifecycle(ELifecycle.LOADING, imgEl);
        imgEl.setAttribute('src', origSrc!);
      }

      this._listenImgStatus(
        imgEl,
        () => {
          if (imgEl.getAttribute('src') !== this._lazyOptions.errorImg) {
            this._lifecycle(ELifecycle.LOADED, imgEl);
          }
        },
        () => {
          this._imgObserver?.unobserve(imgEl);
          this._lifecycle(ELifecycle.ERROR, imgEl);

          if (this._lazyOptions.errorImg) {
            const currentImgSrc = imgEl.getAttribute('src');
            if (currentImgSrc !== this._lazyOptions.errorImg) {
              imgEl.setAttribute('src', this._lazyOptions.errorImg);
            }
          }

          console.error(
            `${this._logMsgPrefix} 图片加载失败，图片 url 地址是：${imgEl.getAttribute(
              EImgCustAttr.ORIG_SRC
            )}`
          );
        }
      );
    }
  }

  private _listenImgStatus(
    imgEl: HTMLImageElement,
    successCallback: ((this: GlobalEventHandlers, ev: Event) => any) | null,
    errorCallback: OnErrorEventHandler
  ): void {
    imgEl.onload = successCallback;
    imgEl.onerror = errorCallback;
  }

  public clearLazyTimeout(imgEl: HTMLImageElement | Element): void {
    if (imgEl.hasAttribute(EImgCustAttr.TIMEOUT_ID)) {
      clearTimeout(Number(imgEl.getAttribute(EImgCustAttr.TIMEOUT_ID)));
      imgEl.removeAttribute(EImgCustAttr.TIMEOUT_ID);
    }
  }

  private _lifecycle(lifecycle: ELifecycle, imgEl: HTMLImageElement): void {
    const { lifeFunc } = this._lazyOptions;
    switch (lifecycle) {
      case ELifecycle.LOADING:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADING);

        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADING] === 'function') {
          lifeFunc[ELifecycle.LOADING]?.(imgEl);
        }
        break;

      case ELifecycle.LOADED:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADED);
        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADED] === 'function') {
          lifeFunc[ELifecycle.LOADED]?.(imgEl);
        }
        break;

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
