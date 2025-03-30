export interface ILazyOptions {
  loadingImg?: string;

  errorImg?: string;

  lifeFunc?: TLifeFunc;

  delay?: number;
}

export enum ELifecycle {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export type TLifeFunc = {
  [K in ELifecycle]?: (imgEl: HTMLImageElement, ...args: any[]) => any;
};

export enum EImgCustAttr {
  IMG_ID = 'data-img-id',
  ORIG_SRC = 'data-orig-src',
  TIMEOUT_ID = 'data-timeout-id',
  LOAD_STATUS = 'data-load-status',
}

export type EmitFunc = (event: 'update:modelValue', ...args: any[]) => void;
