import { DEFAULT_LOADING_IMG } from './constants';
import { EImgCustAttr } from './types';

export function hasIntersectionObserver(): boolean {
  if (
    window &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Reflect.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get() {
          return this.intersectionRatio > 0;
        },
      });
    }

    return true;
  }

  return false;
}

export function isObject(value: any): value is object {
  return toString.call(value) === '[object Object]';
}

export function isArray(value: any): value is Array<any> {
  return toString.call(value) === '[object Array]' || Array.isArray(value);
}

export function isFunc(value: any): value is Function {
  return toString.call(value) === '[object Function]' || typeof value === 'function';
}

export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]' || value instanceof Date;
}

export function isRegExp(value: any): value is RegExp {
  return toString.call(value) === '[object RegExp]' || value instanceof RegExp;
}

export function isError(value: any): value is Error {
  return toString.call(value) === '[object Error]' || value instanceof Error;
}

export function deepCopy(
  obj: any,

  which: ('object' | 'array' | 'function' | 'date' | 'regexp' | 'error' | 'set' | 'map')[] = [
    'object',
    'array',
    'function',
    'date',
    'regexp',
    'error',
    'set',
    'map',
  ]
) {
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) return obj;

  if (isObject(obj) && which.includes('object')) {
    return Object.keys(obj).reduce((newObj, k, i) => {
      newObj[k] = deepCopy(obj[k], which);
      return newObj;
    }, {});
  } else if (isArray(obj) && which.includes('array')) {
    return obj.reduce((arr, v, i) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);
  } else if (isFunc(obj) && which.includes('function')) {
    const newFunc = new Function('return ' + obj.toString())();

    return newFunc;
  } else if (isDate(obj) && which.includes('date')) {
    return new Date(obj.getTime());
  } else if (isRegExp(obj) && which.includes('regexp')) {
    return new RegExp(obj.source, obj.flags);
  } else if (isError(obj as Error) && which.includes('error')) {
    const errorProps = { ...obj };

    Object.getOwnPropertyNames(obj).forEach((k) => {
      if (k === 'stack') {
        errorProps[k] = obj[k].split('\n');
      }

      if (
        obj.hasOwnProperty('k') &&
        k !== 'message' &&
        k !== 'name' &&
        k !== 'stack' &&
        k !== 'constructor'
      ) {
        errorProps[k] = obj[k];
      }
    });

    const newError = new Error(obj.message);
    newError.name = obj.name;
    newError.stack = errorProps.stack.join('\n') + ' ';

    Object.getOwnPropertyNames(errorProps).forEach((k) => {
      if (!['message', 'name', 'stack'].includes(k)) {
        Reflect.defineProperty(newError, k, Reflect.getOwnPropertyDescriptor(errorProps, k)!);
      }
    });

    return newError;
  } else if (obj instanceof Set && which.includes('set')) {
    const newSetItems = Array.from(obj).reduce((arr: any[], v: any, i: number) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);

    const newSet = new Set([...newSetItems]);
    return newSet;
  } else if (obj instanceof Map && which.includes('map')) {
    const map2Obj = Object.fromEntries(obj);

    const newMap2Obj = deepCopy(map2Obj, which);

    const newMap = new Map(Object.entries(newMap2Obj));

    return newMap;
  }

  return obj;
}

export function createImgObjFromUrl(imgUrl: string): Promise<{ img: HTMLImageElement; err: null | Event }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = (e) => resolve({ img, err: null });
    img.onerror = (e) => {
      console.log('Could not load loadingImg at ' + imgUrl);
      reject({ img, err: e });
    };
    img.src = imgUrl;
  });
}

export function waitLoadingImg(
  imgUrl: string,
  instId: number
): Promise<{ img: HTMLImageElement; err: null | Event }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = (e) => resolve({ img, err: null });

    img.onerror = (e) => {
      console.warn(`[lazy-load-imgs]: Could not load loadingImg at ${imgUrl}.
Now using the default base64 encoding format for preloaded images(loadingImg).`);
      img.src = DEFAULT_LOADING_IMG;

      const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);

      Array.prototype.forEach.call(allImgs, (img: HTMLImageElement) => {
        img.setAttribute('src', DEFAULT_LOADING_IMG);
      });

      reject({ img, err: e });
    };

    img.src = imgUrl;
  });
}

export function waitLoadingImg_unused(
  imgUrl: string,
  instId: number,
  attemps = 1,
  timeout = 100
): Promise<{ img: HTMLImageElement; err: null | Event }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let isTimeout = false;
    let attemps_num = 0;
    img.onload = (e) => {
      if (isTimeout && attemps_num < attemps) {
        img.src = imgUrl;
        attemps_num++;
        console.log('onload attemps_num:', attemps_num);
      } else {
        setTimeout(() => {
          console.log('onload success');
          resolve({ img, err: null });
        }, 2000);
      }
    };
    img.onerror = (e) => {
      if (attemps_num < attemps) {
        img.src = imgUrl;
        attemps_num++;
        console.log('onerror attemps_num:', attemps_num);
      } else {
        img.src = DEFAULT_LOADING_IMG;

        const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);

        Array.prototype.forEach.call(allImgs, (img: HTMLImageElement) => {
          img.src = DEFAULT_LOADING_IMG;
        });
        console.log('Could not load loadingImg at ' + imgUrl);
      }
    };
    img.src = imgUrl;
    setTimeout(() => {
      isTimeout = true;
    }, timeout);
  });
}

export async function url2base64(url: string, imgType = 'image/jpeg'): Promise<string> {
  let base64 = '';

  const blob = await window
    .fetch(url, {
      headers: {
        'Content-Type': imgType,
      },
    })
    .then((res) => res.blob());

  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = (e) => {
    const buffer = new Uint8Array(e.target!.result as ArrayBuffer);

    const byteCode = buffer.reduce((prevByte, byte) => {
      prevByte += String.fromCharCode(byte);
      return prevByte;
    }, '');

    return (base64 = window.btoa(byteCode));
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(base64);
    }, 10);
  });
}
