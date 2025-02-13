import { type App } from 'vue-demi';
import LazyLoadImgs from '@/components/lazy-load-imgs.vue';
import { ILazyOptions } from '@/scripts/types';
import { lazyOptionsObj } from '@/scripts/lazy-observer-options';

// 定义要批量全局注册的组件数组
const comps = [LazyLoadImgs];

// 导出全局注册的 LazyLoadImgs 组件
const install = (app: App, options: ILazyOptions = {}): any => {
  // 将用户全局注册本组件时传入的作为组件的 Props 参数选项，覆盖到默认参数中
  Object.assign(lazyOptionsObj, options);

  // 注册本组件
  comps.forEach((comp: any, i: number) => {
    app.component(comp.name, comp);
    console.log('comp.name:', comp.name, comp);
  });
};
export default install;

export { LazyLoadImgs };
