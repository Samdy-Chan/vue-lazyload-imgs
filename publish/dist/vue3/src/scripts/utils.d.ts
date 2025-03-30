export declare function hasIntersectionObserver(): boolean;
export declare function isObject(value: any): value is object;
export declare function isArray(value: any): value is Array<any>;
export declare function isFunc(value: any): value is Function;
export declare function isDate(value: any): value is Date;
export declare function isRegExp(value: any): value is RegExp;
export declare function isError(value: any): value is Error;
export declare function deepCopy(obj: any, which?: ('object' | 'array' | 'function' | 'date' | 'regexp' | 'error' | 'set' | 'map')[]): any;
export declare function createImgObjFromUrl(imgUrl: string): Promise<{
    img: HTMLImageElement;
    err: null | Event;
}>;
export declare function waitLoadingImg(imgUrl: string, instId: number): Promise<{
    img: HTMLImageElement;
    err: null | Event;
}>;
export declare function waitLoadingImg_unused(imgUrl: string, instId: number, attemps?: number, timeout?: number): Promise<{
    img: HTMLImageElement;
    err: null | Event;
}>;
export declare function url2base64(url: string, imgType?: string): Promise<string>;
