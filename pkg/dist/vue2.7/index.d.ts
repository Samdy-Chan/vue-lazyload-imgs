import { App } from 'vue-demi';
import { default as LazyLoadImgs } from './src/components/lazy-load-imgs.vue';
import { ILazyOptions } from './src/scripts/types';
declare const install: (app: App, options?: ILazyOptions) => any;
export default install;
export { LazyLoadImgs };
