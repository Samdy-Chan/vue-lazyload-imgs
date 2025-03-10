import { DEFAULT_LOADING_IMG } from './constants';
import { EImgCustAttr } from './types';

/**
 * @description - 检查浏览器是否存在支持 IntersectionObserver 的必要属性
 * @returns
 */
export function hasIntersectionObserver(): boolean {
  if (
    window &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    // 微软 Edge 15 浏览器不支持 isIntersecting 属性，
    // 详见：// See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      // Object.defineProperty 同一属性不能重定义多次，重复定义会报错，
      // Reflect.defineProperty 同一属性可重复定义多次，首次定义返回 true，多次定义返回 false
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

/**
 * @description - 检查值是否为纯对象类型
 * @param value
 * @returns
 */
export function isObject(value: any): value is object {
  return toString.call(value) === '[object Object]';
}

/**
 * @description - 检查值是否为数组类型
 * @param value
 * @returns
 */
export function isArray(value: any): value is Array<any> {
  return toString.call(value) === '[object Array]' || Array.isArray(value);
}

/**
 * @description - 检查值是否为函数类型
 * @param value
 * @returns
 */
export function isFunc(value: any): value is Function {
  return toString.call(value) === '[object Function]' || typeof value === 'function';
}

/**
 * @description - 检查值是否为日期类型
 * @param value
 * @returns
 */
export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]' || value instanceof Date;
}

/**
 * @description - 检查值是否为正则表达式类型
 * @param value
 * @returns
 */
export function isRegExp(value: any): value is RegExp {
  return toString.call(value) === '[object RegExp]' || value instanceof RegExp;
}

/**
 * @description - 检查值是否为错误对象类型
 * @param value
 * @returns
 */
export function isError(value: any): value is Error {
  return toString.call(value) === '[object Error]' || value instanceof Error;
}

/**
 * @description - 支持深度递归拷贝 8 种类型的对象
 * @param obj
 * @returns
 */
export function deepCopy(
  obj: any,
  // 要深拷贝对象的类型，默认深拷贝如下 8 种类型的对象（不包括 WeakSet 和 WeakMap）
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
  // 如果是 null 或原始类型，直接返回
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) return obj;

  if (isObject(obj) && which.includes('object')) {
    // 如果值为纯对象
    return Object.keys(obj).reduce((newObj, k, i) => {
      newObj[k] = deepCopy(obj[k], which);
      return newObj;
    }, {});
  } else if (isArray(obj) && which.includes('array')) {
    // 否则如果值为数组
    return obj.reduce((arr, v, i) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);
  } else if (isFunc(obj) && which.includes('function')) {
    // 否则如果值为函数
    // 创建一个全新的函数，而非函数引用
    const newFunc = new Function('return ' + obj.toString())();
    // 返回创建的新函数
    return newFunc;
  } else if (isDate(obj) && which.includes('date')) {
    // 否则如果值为日期类型
    return new Date(obj.getTime());
  } else if (isRegExp(obj) && which.includes('regexp')) {
    // 否则如果值为正则表达式类型
    return new RegExp(obj.source, obj.flags);
  } else if (isError(obj as Error) && which.includes('error')) {
    // 否则如果值为错误对象类型
    const errorProps = { ...obj };
    // 删除不可枚举属性和不可复制属性
    Object.getOwnPropertyNames(obj).forEach((k) => {
      if (k === 'stack') {
        errorProps[k] = obj[k].split('\n');
      }
      // 只有可枚举的自有属性是可复制的
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
    // 创建新的Error实例并设置属性
    const newError = new Error(obj.message);
    newError.name = obj.name;
    newError.stack = errorProps.stack.join('\n') + ' '; // 至少加个空格，stack 才是复制，否则是引用
    // 复制其他属性
    Object.getOwnPropertyNames(errorProps).forEach((k) => {
      if (!['message', 'name', 'stack'].includes(k)) {
        Reflect.defineProperty(newError, k, Reflect.getOwnPropertyDescriptor(errorProps, k)!);
      }
    });
    // 返回深拷贝的新错误对象
    return newError;
  } else if (obj instanceof Set && which.includes('set')) {
    // 否则如果值为 Set 集合类型
    // 循环遍历原 Set 集合的每个集合项，生成新的集合项：使用 Array.from，[...obj] 兼容性不够好
    const newSetItems = Array.from(obj).reduce((arr: any[], v: any, i: number) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);
    // 根据以上生成的新集合项，重新创建新的 Set 集合对象并返回
    const newSet = new Set([...newSetItems]);
    return newSet;
  } else if (obj instanceof Map && which.includes('map')) {
    // 否则如果值为 Map 键值映射类型
    // 将 Map 映射类型转换为 object 对象
    const map2Obj = Object.fromEntries(obj);
    // 深拷贝转换后的对象
    const newMap2Obj = deepCopy(map2Obj, which);
    // 根据深拷贝转换后的对象创建新的 Map 键值映射对象
    const newMap = new Map(Object.entries(newMap2Obj));
    // 返回新的 Map 键值映射对象
    return newMap;
  }

  // 如果是其它类型的值，如 WeakSet, WeakMap 对象弱引用类型，则直接返回
  return obj;
}

/**
 * @description - 根据图片 url 创建图片对象
 * @param imgUrl
 * @returns
 */
export function createImgObjFromUrl(imgUrl: string): Promise<{ img: HTMLImageElement; err: null | Event }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = (e) => resolve({ img, err: null });
    img.onerror = (e) => {
      console.log('Could not load loadingImg at ' + imgUrl);
      reject({ img, err: e }); // 如果加载图片出错，img.width 和 img.height 均为0
    };
    img.src = imgUrl;
  });
}

/**
 * @description - 等待加载预加载图片 loadingImg
 * @param imgUrl
 * @param instId
 * @returns
 */
export function waitLoadingImg(
  imgUrl: string,
  instId: number
): Promise<{ img: HTMLImageElement; err: null | Event }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = (e) => resolve({ img, err: null });

    img.onerror = (e) => {
      // 如果加载用户通过 props 传入的 loadingImg 预加载图片失败，则更改为本组件内置的默认的 base64 格式的预加载图片
      console.warn(`[lazy-load-imgs]: Could not load loadingImg at ${imgUrl}.
Now using the default base64 encoding format for preloaded images(loadingImg).`);
      img.src = DEFAULT_LOADING_IMG;

      // 获取本懒加载组件实例的每个 img 元素（即使用本组件标签包裹起来的所有 img 标签集合）
      const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);
      // console.log('allImgs:', allImgs, instId);
      // 修改本懒加载组件实例内的所有图片的 src 属性显示为默认的 base64 格式的预加载图片
      Array.prototype.forEach.call(allImgs, (img: HTMLImageElement) => {
        img.setAttribute('src', DEFAULT_LOADING_IMG);
      });

      reject({ img, err: e }); // 如果加载图片出错，img.width 和 img.height 均为0
    };

    img.src = imgUrl;
  });
}

/**
 * @description - 等待加载预加载图片 loadingImg（unused）
 * @param imgUrl
 * @param instId
 * @param attemps
 * @param timeout
 * @returns
 */
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
        // 获取本组件每个实例需要开启监听的每个 img 元素（即使用本组件标签包裹起来的所有 img 标签集合）
        const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);
        // console.log('allImgs:', allImgs, instId);
        Array.prototype.forEach.call(allImgs, (img: HTMLImageElement) => {
          img.src = DEFAULT_LOADING_IMG;
        });
        console.log('Could not load loadingImg at ' + imgUrl);
        // reject({ img, err: e });  // 如果加载图片出错，img.width 和 img.height 均为0
      }
    };
    img.src = imgUrl;
    setTimeout(() => {
      isTimeout = true;
    }, timeout);
  });
}

/**
 * @description - 文件转 base64
 * @param {string} url - 文件 url
 * @returns {Promise<string>}
 */
export async function url2base64(url: string, imgType = 'image/jpeg'): Promise<string> {
  let base64 = '';
  // url 转 blob
  const blob = await window
    .fetch(url, {
      headers: {
        'Content-Type': imgType,
      },
    })
    .then((res) => res.blob());
  // console.log('blob:', blob);

  // 读取 blob 和转换
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = (e) => {
    // blob 转 buffer
    const buffer = new Uint8Array(e.target!.result as ArrayBuffer);
    // console.log('buffer:', buffer);

    // buffer 转字节码
    const byteCode = buffer.reduce((prevByte, byte) => {
      prevByte += String.fromCharCode(byte);
      return prevByte;
    }, '');
    // console.log('byteCode:', byteCode);

    // 字节码转 base64
    return (base64 = window.btoa(byteCode));
    // console.log('base64:', base64);
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(base64);
    }, 10);
  });
}
