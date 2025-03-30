import { DEFAULT_ERROR_IMG, DEFAULT_LOADING_IMG } from '@/scripts/constants';

import { ELifecycle, ILazyOptions } from '@/scripts/types';

export const lazyOptionsObj: ILazyOptions = {
  loadingImg: DEFAULT_LOADING_IMG,

  errorImg: DEFAULT_ERROR_IMG,

  delay: 500,
};

export const observerOptionsObj: IntersectionObserverInit = {
  root: null,

  rootMargin: '0px',

  threshold: 0,
};
