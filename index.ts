import { type App } from 'vue-demi';
import LazyLoadImgs from '@/components/lazy-load-imgs.vue';

// 定义要批量全局注册的组件数组
const comps = [LazyLoadImgs];

// 导出全局注册的 LazyLoadImgs 组件
const install = (app: App, ...options: any[]): any => {
  comps.forEach((comp: any, i: number) => {
    app.component(comp.name, comp);
    console.log('comp.name:', comp.name, comp);
  });
};
export default install;

export { LazyLoadImgs };
