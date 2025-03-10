// 创建 lazy 实例对象的构造函数参数类型定义
export interface ILazyOptions {
  // 图片加载中状态显示的图片
  loadingImg?: string;
  // 图片加载失败状态显示的图片
  errorImg?: string;
  // Lazy 实例对象生命周期回调函数
  lifeFunc?: TLifeFunc;
  // 图片进入视口交叉状态后，延迟多久加载图片（ms）
  delay?: number;
}

// 图片加载状态的枚举类型定义
export enum ELifecycle {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

// 图片加载生命周期函数类型定义
export type TLifeFunc = {
  [K in ELifecycle]?: (imgEl: HTMLImageElement, ...args: any[]) => any;
};

// img 标签的 data-img-id 自定义属性枚举常量
export enum EImgCustAttr {
  IMG_ID = 'data-img-id',
  ORIG_SRC = 'data-orig-src',
  TIMEOUT_ID = 'data-timeout-id',
  LOAD_STATUS = 'data-load-status',
}

// 父组件传过来的用于梆定 v-html 渲染指令的 v-model/modelValue 的值类型
export type TModelValue = { key: string; htmlStr: string }[];

// Vue3/Vue2 更新 v-model/modelValue 参数的 emit('update:modelValue) 还是 emit('chgImgList') 泛型函数事件参数类型
export type EmitFunc = (event: 'update:modelValue' | 'chgImgList', ...args: any[]) => void;
