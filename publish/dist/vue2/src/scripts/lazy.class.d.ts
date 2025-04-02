import { VNode } from 'vue-demi';
import { EmitFunc, ILazyOptions } from './types';
export declare class Lazy {
    private _lazyOptions;
    private _observerOptions;
    private _htmlFieldName;
    private _imgObserver;
    static instId: number;
    private _imgId;
    private _dataImgIdList;
    private _logMsgPrefix;
    private _modelHtmlIdx;
    private _modelHtmlArr;
    constructor(lazyOptions: ILazyOptions, observerOptions: IntersectionObserverInit, htmlFieldName: string | undefined);
    setImgSrcToLoadingImg(vnodes: VNode[], modelValue: string | object[] | undefined, emits: EmitFunc): string[];
    createImgObserver(): IntersectionObserver;
    private _intersectionCallback;
    private _delayIntersectionCallback;
    private _setImgSrc;
    private _listenImgStatus;
    clearLazyTimeout(imgEl: HTMLImageElement | Element): void;
    private _lifecycle;
}
