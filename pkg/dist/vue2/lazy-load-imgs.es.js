var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { isVue2, isVue3, defineComponent, getCurrentInstance, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, version, useSlots } from "vue-demi";
const DEFAULT_LOADING_IMG = "data:image/jpeg;base64,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";
const DEFAULT_ERROR_IMG = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFRENBRUZFRUQ0QzExRUY5MDUwRTE1RDhDQThCRUVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFRENBRUZERUQ0QzExRUY5MDUwRTE1RDhDQThCRUVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM1NDczNTJFRDQ2MTFFRjk3NUY4MDM3RkM3RjE5OEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM1NDczNTNFRDQ2MTFFRjk3NUY4MDM3RkM3RjE5OEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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";
const lazyOptionsObj = {
  loadingImg: DEFAULT_LOADING_IMG,
  errorImg: DEFAULT_ERROR_IMG,
  delay: 500
};
const observerOptionsObj = {
  root: null,
  rootMargin: "0px",
  threshold: 0
};
var ELifecycle = /* @__PURE__ */ ((ELifecycle2) => {
  ELifecycle2["LOADING"] = "loading";
  ELifecycle2["LOADED"] = "loaded";
  ELifecycle2["ERROR"] = "error";
  return ELifecycle2;
})(ELifecycle || {});
var EImgCustAttr = /* @__PURE__ */ ((EImgCustAttr2) => {
  EImgCustAttr2["IMG_ID"] = "data-img-id";
  EImgCustAttr2["ORIG_SRC"] = "data-orig-src";
  EImgCustAttr2["TIMEOUT_ID"] = "data-timeout-id";
  EImgCustAttr2["LOAD_STATUS"] = "data-load-status";
  return EImgCustAttr2;
})(EImgCustAttr || {});
function isObject(value) {
  return toString.call(value) === "[object Object]";
}
function isArray(value) {
  return toString.call(value) === "[object Array]" || Array.isArray(value);
}
function isFunc(value) {
  return toString.call(value) === "[object Function]" || typeof value === "function";
}
function isDate(value) {
  return toString.call(value) === "[object Date]" || value instanceof Date;
}
function isRegExp(value) {
  return toString.call(value) === "[object RegExp]" || value instanceof RegExp;
}
function isError(value) {
  return toString.call(value) === "[object Error]" || value instanceof Error;
}
function deepCopy(obj, which = [
  "object",
  "array",
  "function",
  "date",
  "regexp",
  "error",
  "set",
  "map"
]) {
  if (obj === null || typeof obj !== "object" && typeof obj !== "function")
    return obj;
  if (isObject(obj) && which.includes("object")) {
    return Object.keys(obj).reduce((newObj, k, i) => {
      newObj[k] = deepCopy(obj[k], which);
      return newObj;
    }, {});
  } else if (isArray(obj) && which.includes("array")) {
    return obj.reduce((arr, v, i) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);
  } else if (isFunc(obj) && which.includes("function")) {
    const newFunc = new Function("return " + obj.toString())();
    return newFunc;
  } else if (isDate(obj) && which.includes("date")) {
    return new Date(obj.getTime());
  } else if (isRegExp(obj) && which.includes("regexp")) {
    return new RegExp(obj.source, obj.flags);
  } else if (isError(obj) && which.includes("error")) {
    const errorProps = { ...obj };
    Object.getOwnPropertyNames(obj).forEach((k) => {
      if (k === "stack") {
        errorProps[k] = obj[k].split("\n");
      }
      if (obj.hasOwnProperty("k") && k !== "message" && k !== "name" && k !== "stack" && k !== "constructor") {
        errorProps[k] = obj[k];
      }
    });
    const newError = new Error(obj.message);
    newError.name = obj.name;
    newError.stack = errorProps.stack.join("\n") + " ";
    Object.getOwnPropertyNames(errorProps).forEach((k) => {
      if (!["message", "name", "stack"].includes(k)) {
        Reflect.defineProperty(newError, k, Reflect.getOwnPropertyDescriptor(errorProps, k));
      }
    });
    return newError;
  } else if (obj instanceof Set && which.includes("set")) {
    const newSetItems = Array.from(obj).reduce((arr, v, i) => {
      arr[i] = deepCopy(v, which);
      return arr;
    }, []);
    const newSet = /* @__PURE__ */ new Set([...newSetItems]);
    return newSet;
  } else if (obj instanceof Map && which.includes("map")) {
    const map2Obj = Object.fromEntries(obj);
    const newMap2Obj = deepCopy(map2Obj, which);
    const newMap = new Map(Object.entries(newMap2Obj));
    return newMap;
  }
  return obj;
}
function waitLoadingImg(imgUrl, instId) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = (e) => resolve({ img, err: null });
    img.onerror = (e) => {
      console.warn(`[lazy-load-imgs]: Could not load loadingImg at ${imgUrl}.
Now using the default base64 encoding format for preloaded images(loadingImg).`);
      img.src = DEFAULT_LOADING_IMG;
      const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);
      Array.prototype.forEach.call(allImgs, (img2) => {
        img2.setAttribute("src", DEFAULT_LOADING_IMG);
      });
      reject({ img, err: e });
    };
    img.src = imgUrl;
  });
}
const _Lazy = class {
  constructor(lazyOptions, observerOptions, htmlFieldName) {
    __publicField(this, "_lazyOptions", deepCopy(lazyOptionsObj));
    __publicField(this, "_observerOptions", deepCopy(observerOptionsObj));
    __publicField(this, "_htmlFieldName");
    __publicField(this, "_imgObserver", null);
    __publicField(this, "_imgId", 1);
    __publicField(this, "_dataImgIdList", []);
    __publicField(this, "_logMsgPrefix", "[vue-lazyload-imgs]:");
    __publicField(this, "_modelHtmlIdx", 0);
    __publicField(this, "_modelHtmlArr", []);
    _Lazy.instId++;
    this._lazyOptions = Object.assign(this._lazyOptions, lazyOptions);
    this._observerOptions = Object.assign(this._observerOptions, observerOptions);
    this._htmlFieldName = htmlFieldName;
  }
  setImgSrcToLoadingImg(vnodes, modelValue, emits) {
    if (Array.isArray(vnodes) && vnodes.length > 0) {
      let dataImgId = "";
      const imgHtmlReg = new RegExp("<\\s*img\\s+src\\s*=\\s*.*(\\/)?\\s*>", "gi");
      let imgsInHtml = null;
      vnodes.forEach((vnode) => {
        if (!vnode.children && typeof vnode.children !== "string") {
          const vnodeProps = isVue2 ? vnode?.data?.attrs : vnode.props;
          const vnodeInnerHTMLObj = isVue2 ? vnode?.data?.domProps : vnode.props;
          const vnodeTag = isVue2 ? vnode.tag : vnode.type;
          if (vnodeTag === "img" && vnodeProps) {
            dataImgId = `inst${_Lazy.instId}-${this._imgId++}`;
            vnodeProps[EImgCustAttr.IMG_ID] = dataImgId;
            this._dataImgIdList.push(dataImgId);
            vnodeProps[EImgCustAttr.ORIG_SRC] = vnodeProps.src;
            vnodeProps.src = this._lazyOptions.loadingImg;
          } else if (vnodeInnerHTMLObj?.innerHTML && (imgsInHtml = vnodeInnerHTMLObj?.innerHTML.match(imgHtmlReg))) {
            imgsInHtml.forEach((img) => {
              dataImgId = `inst${_Lazy.instId}-${this._imgId++}`;
              this._dataImgIdList.push(dataImgId);
              const dataIdAttr = `${EImgCustAttr.IMG_ID}="${dataImgId}"`;
              const srcVal = img.match(/\s*src\s*=\s*['"`]?(.*)['"`].?/i)[1];
              const origSrcAttr = `${EImgCustAttr.ORIG_SRC}="${srcVal}"`;
              let newImg = img.replace(/((\/?)\s*>)/, ` ${dataIdAttr} ${origSrcAttr} $1`);
              newImg = newImg.replace(srcVal, this._lazyOptions.loadingImg);
              vnodeInnerHTMLObj.innerHTML = vnodeInnerHTMLObj.innerHTML.replace(img, newImg);
            });
            if (modelValue) {
              if (isVue3 && typeof modelValue === "string") {
                emits("update:modelValue", vnodeInnerHTMLObj.innerHTML);
              } else if (Array.isArray(modelValue)) {
                if (this._htmlFieldName) {
                  this._modelHtmlArr[this._modelHtmlIdx] = {
                    ...modelValue[this._modelHtmlIdx],
                    [this._htmlFieldName]: vnodeInnerHTMLObj.innerHTML
                  };
                  this._modelHtmlIdx++;
                } else if (isVue3) {
                  console.error(`${this._logMsgPrefix} The Props htmlFieldName cannot be empty! 
Please specify, for example:
<LazyLoadImgs htmlFieldName="content">Some HTML tags</LazyLoadImgs>`);
                  return;
                }
              }
            }
            console.log("modelHtmlArr:", JSON.stringify(this._modelHtmlArr));
          }
        } else {
          this.setImgSrcToLoadingImg(vnode.children, modelValue, emits);
        }
      });
      if (isVue3 && this._modelHtmlArr.length && this._htmlFieldName) {
        emits("update:modelValue", this._modelHtmlArr);
      }
    }
    return this._dataImgIdList;
  }
  createImgObserver() {
    this._imgObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (this._lazyOptions.delay > 0) {
              await this._delayIntersectionCallback(entry);
            } else {
              this._intersectionCallback(entry);
            }
          }
        });
      },
      this._observerOptions
    );
    return this._imgObserver;
  }
  _intersectionCallback(entry) {
    if (entry.isIntersecting) {
      this._imgObserver?.unobserve(entry.target);
      this._setImgSrc(entry.target);
    }
  }
  _delayIntersectionCallback(entry) {
    return new Promise((resolve, reject) => {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute(EImgCustAttr.TIMEOUT_ID))
          return;
        let timeoutId = setTimeout(() => {
          this._intersectionCallback(entry);
          entry.target.removeAttribute(EImgCustAttr.TIMEOUT_ID);
        }, this._lazyOptions.delay);
        entry.target.setAttribute(EImgCustAttr.TIMEOUT_ID, String(timeoutId));
      } else {
        this.clearLazyTimeout(entry.target);
      }
    });
  }
  _setImgSrc(imgEl) {
    if (imgEl.hasAttribute(EImgCustAttr.ORIG_SRC)) {
      let prevSrc = imgEl.getAttribute("src");
      let origSrc = imgEl.getAttribute(EImgCustAttr.ORIG_SRC);
      if (prevSrc !== origSrc) {
        this._lifecycle(ELifecycle.LOADING, imgEl);
        imgEl.setAttribute("src", origSrc);
      }
      this._listenImgStatus(
        imgEl,
        () => {
          if (imgEl.getAttribute("src") !== this._lazyOptions.errorImg) {
            this._lifecycle(ELifecycle.LOADED, imgEl);
          }
        },
        () => {
          this._imgObserver?.unobserve(imgEl);
          this._lifecycle(ELifecycle.ERROR, imgEl);
          if (this._lazyOptions.errorImg) {
            const currentImgSrc = imgEl.getAttribute("src");
            if (currentImgSrc !== this._lazyOptions.errorImg) {
              imgEl.setAttribute("src", this._lazyOptions.errorImg);
            }
          }
          console.error(
            `${this._logMsgPrefix} \u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u56FE\u7247 url \u5730\u5740\u662F\uFF1A${imgEl.getAttribute(
              EImgCustAttr.ORIG_SRC
            )}`
          );
        }
      );
    }
  }
  _listenImgStatus(imgEl, successCallback, errorCallback) {
    imgEl.onload = successCallback;
    imgEl.onerror = errorCallback;
  }
  clearLazyTimeout(imgEl) {
    if (imgEl.hasAttribute(EImgCustAttr.TIMEOUT_ID)) {
      clearTimeout(Number(imgEl.getAttribute(EImgCustAttr.TIMEOUT_ID)));
      imgEl.removeAttribute(EImgCustAttr.TIMEOUT_ID);
    }
  }
  _lifecycle(lifecycle, imgEl) {
    const { lifeFunc } = this._lazyOptions;
    switch (lifecycle) {
      case ELifecycle.LOADING:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADING);
        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADING] === "function") {
          lifeFunc[ELifecycle.LOADING]?.(imgEl);
        }
        break;
      case ELifecycle.LOADED:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.LOADED);
        if (lifeFunc && typeof lifeFunc[ELifecycle.LOADED] === "function") {
          lifeFunc[ELifecycle.LOADED]?.(imgEl);
        }
        break;
      case ELifecycle.ERROR:
        imgEl.setAttribute(EImgCustAttr.LOAD_STATUS, ELifecycle.ERROR);
        if (lifeFunc && typeof lifeFunc[ELifecycle.ERROR] === "function") {
          lifeFunc[ELifecycle.ERROR]?.(imgEl);
        }
        break;
    }
  }
};
let Lazy = _Lazy;
__publicField(Lazy, "instId", 0);
var __vue2_script = defineComponent({
  name: "LazyLoadImgs",
  props: {
    [isVue2 ? "value" : "modelValue"]: {
      type: [String, Array],
      required: false
    },
    lazyOptions: {
      type: Object,
      required: false,
      default: () => deepCopy(lazyOptionsObj)
    },
    observerOptions: {
      type: Object,
      required: false,
      default: () => deepCopy(observerOptionsObj)
    },
    htmlFieldName: {
      type: String,
      required: false
    }
  },
  emits: isVue2 ? [] : ["update:modelValue"],
  setup(props, { emit, attrs }) {
    if (isVue2) {
      console.log("\u8FD9\u91CC\u662F Vue2 \u73AF\u5883...");
    } else if (isVue3) {
      console.log("\u8FD9\u91CC\u662F Vue3 \u73AF\u5883...");
    }
    const lazyOptions = Object.assign({}, lazyOptionsObj, props.lazyOptions);
    const observerOptions = Object.assign(
      {},
      observerOptionsObj,
      props.observerOptions
    );
    const lazy = new Lazy(lazyOptions, observerOptions, props.htmlFieldName);
    let instId = Lazy.instId;
    const app = getCurrentInstance();
    let imgObserver;
    const getDefaultSlotVnodes = () => {
      let defaultSlotVnodes = [];
      if (version.startsWith("2.6")) {
        let slots = app?.slots;
        defaultSlotVnodes = slots?.default;
      } else {
        let slots = useSlots();
        defaultSlotVnodes = slots.default?.();
      }
      return defaultSlotVnodes;
    };
    onBeforeMount(() => {
      const defaultSlotVnodes = getDefaultSlotVnodes();
      console.log("default slot vnodes:", defaultSlotVnodes);
      const modelData = isVue2 ? props.value : props.modelValue;
      lazy.setImgSrcToLoadingImg(defaultSlotVnodes, modelData, emit);
    });
    onMounted(async () => {
      imgObserver = lazy.createImgObserver();
      const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);
      await waitLoadingImg(lazyOptions.loadingImg, instId).catch((err2) => err2);
      Array.prototype.forEach.call(allImgs, (imgEl) => imgObserver.observe(imgEl));
    });
    onBeforeUpdate(() => {
    });
    onUpdated(() => {
    });
    onBeforeUnmount(() => {
      const delayImgs = document.querySelectorAll(
        `img[${EImgCustAttr.IMG_ID}^=inst${instId}-][${EImgCustAttr.TIMEOUT_ID}]`
      );
      Array.prototype.forEach.call(delayImgs, (imgEl) => lazy.clearLazyTimeout(imgEl));
    });
    onUnmounted(() => {
      Lazy.instId--;
      imgObserver.disconnect();
    });
    return {
      instId
    };
  }
});
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "lazyload-all-box"
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
var lazyLoadImgs_vue_vue_type_style_index_0_scoped_true_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(
  __vue2_script,
  render,
  staticRenderFns,
  false,
  __vue2_injectStyles,
  "78abccd8",
  null,
  null
);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var LazyLoadImgs = /* @__PURE__ */ function() {
  return __component__.exports;
}();
const comps = [LazyLoadImgs];
const install = (app, options = {}) => {
  Object.assign(lazyOptionsObj, options);
  comps.forEach((comp, i) => {
    app.component(comp.name, comp);
    console.log("comp.name:", comp.name, comp);
  });
};
export { LazyLoadImgs, install as default };
//# sourceMappingURL=lazy-load-imgs.es.js.map
