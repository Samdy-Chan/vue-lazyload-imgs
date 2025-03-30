import { type App } from 'vue-demi';
import LazyLoadImgs from '@/components/lazy-load-imgs.vue';
import { ILazyOptions } from '@/scripts/types';
import { lazyOptionsObj } from '@/scripts/lazy-observer-options';

const comps = [LazyLoadImgs];

const install = (app: App, options: ILazyOptions = {}): any => {
  Object.assign(lazyOptionsObj, options);

  comps.forEach((comp: any, i: number) => {
    app.component(comp.name, comp);
    console.log('comp.name:', comp.name, comp);
  });
};
export default install;

export { LazyLoadImgs };
