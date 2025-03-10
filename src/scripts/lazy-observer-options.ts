/**
 * LazyLoadImgs.vue 组件的 Props 参数 lazyOptions 和 observerOptions 的配置项默认值
 */

// 导入常量
import { DEFAULT_ERROR_IMG, DEFAULT_LOADING_IMG } from '@/scripts/constants';

// 导入 TS 类型声明
import { ELifecycle, ILazyOptions } from '@/scripts/types';

// 懒加载选项参数配置
export const lazyOptionsObj: ILazyOptions = {
  // 图片加载中状态显示的图片
  loadingImg: DEFAULT_LOADING_IMG,
  // 图片加载失败状态显示的图片
  errorImg: DEFAULT_ERROR_IMG,
  // 图片各加载状态生命周期回调函数（默认不执行图片加载状态回调函数，需要的话，指定即可）
  /* lifeFunc: {
        // 图片加载中的回调函数
        [ELifecycle.LOADING]: (imgEl: HTMLImageElement) => { console.log('Loading image: ', imgEl) },
        // 图片加载成功后的回调函数
        [ELifecycle.LOADED]: (imgEl: HTMLImageElement) => { console.log('Loaded image: ', imgEl) },
        // 图片加载失败后的回调函数
        [ELifecycle.ERROR]: (imgEl: HTMLImageElement) => { console.log('Loaded image error: ', imgEl) }
    }, */
  // 图片进入视口交叉状态后，延迟多久加载图片（ms）
  delay: 500,
};

// observer 选项参数配置
export const observerOptionsObj: IntersectionObserverInit = {
  // 图片进入可视交叉状态的根容器，默认为浏览器视口(null)，建议取默认值 null 即可
  root: null,
  // 根容器 margin 值，建议取默认值 0px 即可
  rootMargin: '0px',
  // 图片进入与根容器交叠重叠范围的百分比(0-1之间)，即进入可视范围多少百分比后，进行加载，建议取默认值为 0 即可
  threshold: 0,
};
