var k = Object.defineProperty;
var U = (A, e, t) => e in A ? k(A, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : A[e] = t;
var c = (A, e, t) => U(A, typeof e != "symbol" ? e + "" : e, t);
import { isVue2 as d, isVue3 as H, defineComponent as D, getCurrentInstance as O, onBeforeMount as h, onMounted as b, onBeforeUpdate as P, onUpdated as G, onBeforeUnmount as L, onUnmounted as N, version as T, useSlots as q } from "vue-demi";
import { openBlock as x, createElementBlock as W, renderSlot as Y } from "vue";
const S = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEdAR0DASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAIFAQMGBAf/xAA6EAACAQICBwcCBQMEAwEAAAAAAQIDBBFxBRMxMkFTkhIVITNRUpEiQxRCYaGxI8HRYnKB8CSCouH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD7+AAMA81zfUbbFTljP2o8b03HHwoSf69pA1bYjEqe+o8iXUh31HkS6kMTYtsRiVPfUeRLqQ76jyJdSGGxbYjEqe+lyJdSHfUeRLqQw2LbEYlT31HkS6kO+o8iXUhhsW2IxKnvqPIl1Id9R5EupDDYtsRiVPfUeRLqQ76jyJdSGGxbYjEqe+o8iXUh30uRLqQw2LbEYlT31HkS6kO+o8iXUhhsW2IxKnvqPIl1Id9R5EupDDYtsRiVPfS5D6kO+o8iXUhhsW2IxKnvqPIl1Id9R5EupDDYtsRiVPfUeRLqQ76XIl1IYbFtiMSp76jyJdSHfUeRLqQw2LUFV31HkPqQ76jyJdSGGxbAraWmKM5JThKGPHaiwhOM4qUJKSfFMKkAAMHlv7l2tu5Rf1y8I4nqKjTUn26UeGDYKq23JttttvHxMAlTpzrTUIR7UnsRphEFktDVmvqqwT/5M9y1OdD4ZFxWAs+5anOh8Mdy1OdD4YMVgLPuWpzofDHctTnQ+GDFYCz7lqc6Hwx3LU50PhgxWAs+5anOh8Mdy1OdD4YMVgLPuWpzofDHctTnQ+GDFYCz7lqc6Hwx3LU50PhgxWAs+5anOh8Mdy1OdD4YMVgLPuWpzofDHctTnQ+GDFYCz7lqc6Hwx3LU50PhgxWAs+5anOh8Mdy1OdD4YMVgLPuWpzofDHctTnQ+GDFYCz7lqc6Hwx3LU50PhgxWAs+5avOh8HnudH1rWPbeEoeseBTHlR7dHXUqNdU5P+nN4ZM8OwzFtSTW3FfyEjrAYi8Yp/oZMtsFPprzKWTLgp9NeZSyYiXirLXQsU5VZNfUkliVRb6E+9mi1ItgARoAMNpLFvBAZB5KukrWk8HPtP8A0rE0PTNDHwp1P2BqyB4qelbWbwc3D/csD1xnGaxi00+KAkAAAAAAAAAAAAAAAAAAAAAAAAa60VOlKLWKaZsIz3HkErlMMPAyt5Zow9plbyzRpHVQ3I5IkRhuRyRIy0wU+mvMpZMuCn015lLJiJeKst9CfezRUFvoT72aLUi2AMSaUW3sRGmq4uadvSc6j8OC9Shub2tdSfafZhwijF5cu6ruTf0LwivQ8+ZZGbQGylQq15dmnByf8HrWiLlrFuCfpiUeA20bmrbz7VOWH6cGZrWla38yDS9VsNIR0VnfQuoelRbYnrOVpVZUasakHhKPjmdLQrRr0Y1I7H+xMalbQARQAAAAAAAAAAAAAAAAAACM9x5EiM9x5BK5R7TK3lmjD2mVvLNGkdVDcjkiRGG5HJEjLTBT6a8ylky4KfTXmUsmIl4qy30J97NFQW+hPvZotSLY8WlKrp2Ukng5vso9pVaa8uj/ALn/AARqqc229GVevGlHbLa/RGostDJO5qPio/3NMrajRhQpqEFgl+5sSBlGWkZwU4uMknF7U+Jz1/afha+EdyXjE6MrNMxX4em+KngixKpS30NV8KlJ8PqRUHv0O/8Azmv9D/sKkXpkwZI0AAAAAAAAAAAAAAAAAAARnuPIkRnuPIJXKPaZW8s0Ye0yt5Zo0jqobkckSIw3I5IkZaYKfTXmUsmXBT6a8ylkxEvFWW+hPvZoqC30J97NFqRbFdpiDlaxmluy8SxNdekq1GdN/mWBGnLHq0fcK3u4yluy+lnnqQlSm6c1hKLwImmXWLxRlFDaaTqUIqFROcPXij3rS9rhjjJfp2SYuveUul7iM6kaMXj2PF4epm50vKcXGhFxx/MysbbbeOOILWCz0NBuvUqcIxw+SsOi0fbu3tYp+EpeLFSPUZAI0AAAAAAAAAAAAAAAAAAARnuPIkRnuPIJXKPaZW8s0Ye0yt5Zo0jqobkckSIw3I5IkZaYKfTXmUsmXBT6a8ylkxEvFWW+hPvZoqC30J97NFqRbAAjTwaQsPxMdZTw1qXyUUouEnGScWtqaOsPPc2dG5X1x+rhJbRKljmgWdXQ1SL/AKdSMl/q8GaHou7T8tP/ANkXUx4x/wBwLCnoivJ/XKEFniWNto6hbvtYdufukNMeTR2jmpKtWX+2P92W4BGgAAAAAAAAAAAAAAPNVv7ejNxnVSa2peIHpBpo3NK4WNKal+nE3AAAAIz3HkSIz3HkErlHtMreWaMPaZW8s0aR1UNyOSJEYbkckSMtMFPprzKWTLgp9NeZSyYiXirLfQn3s0VBb6E+9mi1ItgARoAAGDIAAAAAAAAAAAAAAAAAAGG8Fi3gU1/pJ1MaVB/TslL1/RBNbb/SXZbo0HjL80l/Yp8Xx2vawDUS1OnUnSqKcJYSXE6CyvYXVP0qLeic4Sp1JUainCXZktjBrqweSyvIXVP0qLeiesy0EZ7jyJEZ7jyCVyj2mVvLNGHtMreWaNI6qG5HJEiMNyOSJGWmCn015lLJlwU+mvMpZMRLxVlvoT72aKgt9CfezRakWwAI0AAAAAAAAAAAAAAAAAAARlNQi5SeCW1sxUqQpU3OclGK2tlBe307qXZWMaafgvXMqWtl/pGVx/TpPClxfuPADKTk0km29mARgtbLRfajrLhPx2QxNtho5UsKtZJz4R9pZjVxzd5ZztZ+OLpvZLA8x1VWlCtTcJrGLOevLOdpU8cXB7JBMaKdSVGpGcJdmS2M6CzvYXVP0qLbE53+SVOpOlUU4S7MlsZSOrIz3HkeazvYXUPSot6J6ZbksjKuUe0yt5Zow9rMreWaNMx1UNyOSJEYbkckSMtsFPprzKWTLgp9NeZSyYiXirLfQn3s0VBb6E+9mi1ItgARoAAAAxJqKbbSS9QMmiV5bQl2ZV4J+naKu/0k6uNOg8IcZeuRWlxNdZGSksYtNeqMnO2N5K1qYPF03vL+50FOcakFOEsYvxTRFSAAAAADTWuKdvTc6ksEv3yI3N1TtablN4vhFbWyguLmpc1O3N7NiWxFS1K7u6l1Uxl4QW7H/vE84J0qU61RQpxbk+HAqIxjKclGCbb8ElxL2w0fG2SnPCVV/t+hssrKFrDHeqPbL/B6yVZAAEUIVaUK1Nwmk4smAObvLOdpU4um9kl/c8x1VWlCtTcJrGLOevLOdpUw8XTeySLGbGinUnSqKcJdmS2P/Jf2t7C6ovhUS+qJzxKnUlTmpQbUkUlxF7WZW8s0Y/X1MreWaA6qG5HJEiMNyOSJGWmCn015lLJlwU+mvMpZMRLxVlvoT72aKgt9CfezRakWwAI0AGutWhQpuc5YJAZqTjTg5zklFbWyivdISuW4QbjS/dkLy8ndywf00+EV/J5S4lo/gGYxc5KMU234YJbSzjoiX4ZtywrbUlsX6FTFWe2wvnbT7M3jSlt/R+p45RlCTjJNSTwaZgHHWRkpRTTTT4mSi0ff6iSpVG9W34N/lf8AgvE014Ga0yeS8vYWsPH6qj3Ykb2/japxjhKq9i4LMoZzlUm5zblJ8WVLUq1adeo51JYyfxkjWDfa2tS6qYR8Irek1sKiNC3qXNVQprF8W9iOgtbSnaU+zBYye2T2slb29O2pqFOOC4vi2biVZAAEUAAAAACFWlCtTcJrGLJgDm7yzna1MH403uyPNtOqq0oVoOE44xZz15ZztKnj403skVmx5jK3lmjAW8s0VI6uG5HJEiMPLjkiRltgp9NeZSyZcFPprzKWTES8VZb6E+9mioLfQn3s0WpFsBieW8vIWkPH6pvZFbSNJ3N1TtqXbm8lxZz9zc1Lqp2p7FuxWxEa1apXqOdR4t/CyNZcZ0JU6c6tRQhHtSfAnQoVLioqdNYvi+CL+0s6drDCPjJ+Lk+IMa7Kwjax7UvqqPj6ZHsWwyCNK/SNh+IjrKaSqpdRRtNPB+DXA6wrNJWGt/rUo/Wl4pcUWVLFL/B7KOkq1G3dJYN/lb4HjBUZbcm2223tb2mAe6x0fK5anUTjSX7ga7Oxndzx8Y01tl6/oX9KjCjBQpx7MUZhCNOChCKjFbEiZlZAABQAAAAAAAAAADXXpxqUpRmsVgbCM9x5Acphh4BbyzQe0yt5Zo0y6qG5HJEiMNyOSJGWmCn015lLJlwU+mvMpZMRLxVltoXZWzRUnpt7uVrSqKC+ufF8DSLa9v420ezDCVV8PTMoqlSVWbnOTlJ7WzDbk8W8W34tmABvtbSpdVOzBYJb0vQ2WdjO6lxjTW2X+C+pUYUKahTWEUQkRt7anbUlCmsPV8WbgCNAAAGDIAqdJWGPar0V47ZRX8lRtOswKbSVh2JOvRj9O2UVw/UsSqwudG33biqFVpSSwi/VFN6BNpprwe0rMdYZK7R9/wDiI6uo8KsePqWJlsAAAAAAAAAAAAACM9x5EiM9x5BK5R7TK3lmjD2mVvLNGkdVDcjkiRGG5HJEjLTBT6a8ylky4KfTXmUsmIlVYANMh7rHR8rlqdRYU/5Ntho3WJVa6wh+WL45lzFKKSWxE1qRiEI04KMUlFbEiQBFAAAAAAAADDWOK4MyAKLSFjqJOrTX9NvxS/KyvOscVJNNJp+GBQaQsXbTc4eNKX/yyypY8cZOMlKLwkvFNF/YXyuodmTSqx2r1Of/AJJQnKnOM4SaktjLUjqweSyvI3VPgqi3kesy0AAAAAAAAAAARnuPIkRnuPIJXKPaZW8s0Ye0yt5Zo0jqobkckSIw3I5IkZaYKfTXmUsmXBT6a8ylkxEvFWWOibanWqTnUWPYawXAri30J97NFqRa4GQCNAAAAAAAAAAAAAARnCNSDjJJxe1EgBzl9ZStamKxdJ7r9H6HlOqqUoVacoTWMXtOdu7SdpU7L8YPdl6//pZWbGqjVlQqRnB4SR0Npdwu6Xaj4SW9H0ObNlvXnbVVUg/Fbf1QI6kGi2uYXNJTg80+DN5GgAAAAAAAAjPceRIjPceQSuUe0yt5Zow9plbyzRpHVQ3I5IkRhuRyRIy0wU+mvMpZMuCn015lLJiJeKsttCfezRUnv0XdRoVpQngoz4v1KkXwMKSaxWDXqhiRrWQYxGIGQYxGIGQYxGIGQYxGIGQYxGIGQYxGIGTVXoQr0nTmsU/2NmIA5m6tp2tXsS8V+V+qNJ01zbwuaLhNZP0ZztehO3qunNeK2P1RWalbXM7Wqpw2cY+qOioV4XFKNSm8Ys5c9FndztKnaXjB70fUErpQa6VWNanGcHjFrFE8SNMgxiMQMgxiMQMkZ7ksmZxPNeXULajJtpyawUfUDnOLMreWaMGVvLNGmXVQ3I5IkRhuRyRIy0FTpmm+zSqcE+yy2NdalCtSlTmvpaA5YHpubGtbS8YuUOEkjzf8/uaZSU5rZOXyNZP3y+WRARLWT98vljWT98vlkQFS1k/fL5Y1k/fL5ZEAS1k/fL5Y1k/fL5ZEAS1k/fL5Y1k/fL5ZEAS1k/fL5Y1k/fL5ZEAS1k/fL5Y1k/fL5ZEAS1k/fL5Y1k/fL5IgCWsn75fJhyct5t5swAgAAMqUorBSaX6MzrJ++XyyICpayfvl8sayfvl8siAJayfvl8sayfvl8siAJayfvl1Mi228W236tgBAlSg6laEFtlJJCMJ1JKMIuTfosS50do90HravmcF6E1ZFilhFL0MhbARoAAGME+BF0aT204dKJgDXqKXKh0oailyodKNgA16ilyodKGopcqHSjYANeopcqHShqKXKh0o2ADXqKXKh0oailyodKNgA16ilyodKGopcqHSjYANeopcqHShqKXKh0o2ADXqKXKh0oailyodKNgA16ilyodKGopcqHSjYANeopcqHShqKXKh0o2ADXqKXKh0oailyodKNgA16ilyodKGopcqHSjYANeopcqHShqKXKh0o2ADXqKXKh0oailyodKNgA16ilyodKGopcqHSjYAIxhCG7FRyWBIAAAAP/9k=", v = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFRENBRUZFRUQ0QzExRUY5MDUwRTE1RDhDQThCRUVCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFRENBRUZERUQ0QzExRUY5MDUwRTE1RDhDQThCRUVCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM1NDczNTJFRDQ2MTFFRjk3NUY4MDM3RkM3RjE5OEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM1NDczNTNFRDQ2MTFFRjk3NUY4MDM3RkM3RjE5OEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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", m = {
  // 图片加载中状态显示的图片
  loadingImg: S,
  // 图片加载失败状态显示的图片
  errorImg: v,
  // 图片各加载状态生命周期回调函数（默认不执行图片加载状态回调函数，需要的话，指定即可）
  /* lifeFunc: {
        // 图片加载中的回调函数
        [ELifecycle.LOADING]: (imgEl: HTMLImageElement) => { console.log('Loading image: ', imgEl) },
        // 图片加载成功后的回调函数
        [ELifecycle.LOADED]: (imgEl: HTMLImageElement) => { console.log('Loaded image: ', imgEl) },
        // 图片加载失败后的回调函数
        [ELifecycle.ERROR]: (imgEl: HTMLImageElement) => { console.log('Loaded image error: ', imgEl) }
    }, */
  // 图片进入视口交叉状态后，延迟多久加载图片（ms）
  delay: 500
}, y = {
  // 图片进入可视交叉状态的根容器，默认为浏览器视口(null)，建议取默认值 null 即可
  root: null,
  // 根容器 margin 值，建议取默认值 0px 即可
  rootMargin: "0px",
  // 图片进入与根容器交叠重叠范围的百分比(0-1之间)，即进入可视范围多少百分比后，进行加载，建议取默认值为 0 即可
  threshold: 0
};
var a = /* @__PURE__ */ ((A) => (A.LOADING = "loading", A.LOADED = "loaded", A.ERROR = "error", A))(a || {}), l = /* @__PURE__ */ ((A) => (A.IMG_ID = "data-img-id", A.ORIG_SRC = "data-orig-src", A.TIMEOUT_ID = "data-timeout-id", A.LOAD_STATUS = "data-load-status", A))(l || {});
function w(A) {
  return toString.call(A) === "[object Object]";
}
function j(A) {
  return toString.call(A) === "[object Array]" || Array.isArray(A);
}
function J(A) {
  return toString.call(A) === "[object Function]" || typeof A == "function";
}
function K(A) {
  return toString.call(A) === "[object Date]" || A instanceof Date;
}
function V(A) {
  return toString.call(A) === "[object RegExp]" || A instanceof RegExp;
}
function Z(A) {
  return toString.call(A) === "[object Error]" || A instanceof Error;
}
function E(A, e = [
  "object",
  "array",
  "function",
  "date",
  "regexp",
  "error",
  "set",
  "map"
]) {
  if (A === null || typeof A != "object" && typeof A != "function") return A;
  if (w(A) && e.includes("object"))
    return Object.keys(A).reduce((t, o, s) => (t[o] = E(A[o], e), t), {});
  if (j(A) && e.includes("array"))
    return A.reduce((t, o, s) => (t[s] = E(o, e), t), []);
  if (J(A) && e.includes("function"))
    return new Function("return " + A.toString())();
  if (K(A) && e.includes("date"))
    return new Date(A.getTime());
  if (V(A) && e.includes("regexp"))
    return new RegExp(A.source, A.flags);
  if (Z(A) && e.includes("error")) {
    const t = { ...A };
    Object.getOwnPropertyNames(A).forEach((s) => {
      s === "stack" && (t[s] = A[s].split(`
`)), A.hasOwnProperty("k") && s !== "message" && s !== "name" && s !== "stack" && s !== "constructor" && (t[s] = A[s]);
    });
    const o = new Error(A.message);
    return o.name = A.name, o.stack = t.stack.join(`
`) + " ", Object.getOwnPropertyNames(t).forEach((s) => {
      ["message", "name", "stack"].includes(s) || Reflect.defineProperty(o, s, Reflect.getOwnPropertyDescriptor(t, s));
    }), o;
  } else if (A instanceof Set && e.includes("set")) {
    const t = Array.from(A).reduce((s, g, i) => (s[i] = E(g, e), s), []);
    return /* @__PURE__ */ new Set([...t]);
  } else if (A instanceof Map && e.includes("map")) {
    const t = Object.fromEntries(A), o = E(t, e);
    return new Map(Object.entries(o));
  }
  return A;
}
function F(A, e) {
  return new Promise((t, o) => {
    const s = new Image();
    s.onload = (g) => t({ img: s, err: null }), s.onerror = (g) => {
      console.warn(`[lazy-load-imgs]: Could not load loadingImg at ${A}.
Now using the default base64 encoding format for preloaded images(loadingImg).`), s.src = S;
      const i = document.querySelectorAll(`img[${l.IMG_ID}^=inst${e}-]`);
      Array.prototype.forEach.call(i, (r) => {
        r.setAttribute("src", S);
      }), o({ img: s, err: g });
    }, s.src = A;
  });
}
const u = class u {
  /**
   * @description - 构造函数
   * @param lazyOptions
   * @param observerOptions
   * @memberof Lazy
   */
  constructor(e, t, o) {
    /**
     * @property {ILazyOptions} _lazyOptions - 默认懒加载配置选项
     * @memberof Lazy
     */
    c(this, "_lazyOptions", E(m));
    /**
     * @property {IntersectionObserverInit} _observerOptions - IntersectionObserver 监听目标进入可视化实例的默认初始化参数
     * @memberof Lazy
     */
    c(this, "_observerOptions", E(y));
    // 由 Props 传入的自定义比如从后端获取的文章信息列表中每篇文章的 html 内容字段名，
    // 使用 v-html 指令渲染 html 格式的文章内容时，必须传该参数
    c(this, "_htmlFieldName");
    // 创建用于实现懒加载图片监听器的 IntersectionObserver 类的实例对象
    c(this, "_imgObserver", null);
    // 本组件默认插槽内的 img 节点ID
    c(this, "_imgId", 1);
    // 保存 <img> 标签里 data-img-id 属性值的数组
    c(this, "_dataImgIdList", []);
    // 控制台日志提示内容前缀
    c(this, "_logMsgPrefix", "[vue-lazyload-imgs]:");
    // 如果使用了内置的 v-html 指令梆定的值是通过 html 字符串数组通过 v-for 进行渲染的，必须要调用 emits 反向
    // 修改梆定值，否则无法实现懒加载效果；
    // 记录每个 html 数组元素，最后再调用 emits('update:modelValue', modelHtmlArr) 反向修改梆定变量
    c(this, "_modelHtmlIdx", 0);
    c(this, "_modelHtmlArr", []);
    u.instId++, this._lazyOptions = Object.assign(this._lazyOptions, e), this._observerOptions = Object.assign(this._observerOptions, t), this._htmlFieldName = o;
  }
  /**
   * @description - 循环递归读取插槽中的 img 标签的 vnode，替换原来的 src 属性为 loadingImg，并将原图src设置到 data-orig-src 属性中
   * @param vnodes - slot 中的 html 虚拟节点
   * @param modelValue - 父组件传过来的双向梆定值，用于支持使用 v-html 指令梆定 html 字符串（或数组）变量进行渲染
   * @param emits - defineEmits 宏接收的父组件传过来的双向梆定事件调用函数
   * @memberof Lazy
   * @returns
   */
  setImgSrcToLoadingImg(e, t, o) {
    if (Array.isArray(e) && e.length > 0) {
      let s = "";
      const g = new RegExp("<\\s*img\\s+src\\s*=\\s*.*(\\/)?\\s*>", "gi");
      let i = null;
      e.forEach((r) => {
        if (!r.children && typeof r.children != "string") {
          const Q = d ? r?.data?.attrs : r.props, B = d ? r?.data?.domProps : r.props;
          if ((d ? r.tag : r.type) === "img" && Q)
            s = `inst${u.instId}-${this._imgId++}`, Q[l.IMG_ID] = s, this._dataImgIdList.push(s), Q[l.ORIG_SRC] = Q.src, Q.src = this._lazyOptions.loadingImg;
          else if (B?.innerHTML && (i = B?.innerHTML.match(g))) {
            if (i.forEach((n) => {
              s = `inst${u.instId}-${this._imgId++}`, this._dataImgIdList.push(s);
              const f = `${l.IMG_ID}="${s}"`, M = n.match(/\s*src\s*=\s*['"`]?(.*)['"`].?/i)[1], p = `${l.ORIG_SRC}="${M}"`;
              let R = n.replace(/((\/?)\s*>)/, ` ${f} ${p} $1`);
              R = R.replace(M, this._lazyOptions.loadingImg), B.innerHTML = B.innerHTML.replace(n, R);
            }), t) {
              if (H && typeof t == "string")
                o("update:modelValue", B.innerHTML);
              else if (Array.isArray(t)) {
                if (this._htmlFieldName)
                  this._modelHtmlArr[this._modelHtmlIdx] = {
                    ...t[this._modelHtmlIdx],
                    [this._htmlFieldName]: B.innerHTML
                  }, this._modelHtmlIdx++;
                else if (H) {
                  console.error(`${this._logMsgPrefix} The Props htmlFieldName cannot be empty! 
Please specify, for example:
<LazyLoadImgs htmlFieldName="content">Some HTML tags</LazyLoadImgs>`);
                  return;
                }
              }
            }
            console.log("modelHtmlArr:", JSON.stringify(this._modelHtmlArr));
          }
        } else
          this.setImgSrcToLoadingImg(r.children, t, o);
      }), H && this._modelHtmlArr.length && this._htmlFieldName && o("update:modelValue", this._modelHtmlArr);
    }
    return this._dataImgIdList;
  }
  /**
   * @description - 创建用于实现懒加载图片，监听图片是否已经进入设置的交叉比例可视区的 IntersectionObserver 类的实例对象
   * @memberof Lazy
   * @returns
   */
  createImgObserver() {
    return this._imgObserver = new IntersectionObserver(
      (e, t) => {
        e.forEach(async (o) => {
          o.isIntersecting && (this._lazyOptions.delay > 0 ? await this._delayIntersectionCallback(o) : this._intersectionCallback(o));
        });
      },
      this._observerOptions
    ), this._imgObserver;
  }
  /**
   * @description - 对图片进入可视区的处理回调函数
   * @param entry
   * @memberof Lazy
   * @returns
   */
  _intersectionCallback(e) {
    e.isIntersecting && (this._imgObserver?.unobserve(e.target), this._setImgSrc(e.target));
  }
  /**
   * @description - 对图片进入可视区的延迟处理回调函数
   * @param entry
   * @memberof Lazy
   * @returns {Promise<void>}
   */
  _delayIntersectionCallback(e) {
    return new Promise((t, o) => {
      if (e.isIntersecting) {
        if (e.target.hasAttribute(l.TIMEOUT_ID)) return;
        let s = setTimeout(() => {
          this._intersectionCallback(e), e.target.removeAttribute(l.TIMEOUT_ID);
        }, this._lazyOptions.delay);
        e.target.setAttribute(l.TIMEOUT_ID, String(s));
      } else
        this.clearLazyTimeout(e.target);
    });
  }
  /**
   *
   * @param imgEl
   * @memberof Lazy
   * @returns
   */
  _setImgSrc(e) {
    if (e.hasAttribute(l.ORIG_SRC)) {
      let t = e.getAttribute("src"), o = e.getAttribute(l.ORIG_SRC);
      t !== o && (this._lifecycle(a.LOADING, e), e.setAttribute("src", o)), this._listenImgStatus(
        e,
        () => {
          e.getAttribute("src") !== this._lazyOptions.errorImg && this._lifecycle(a.LOADED, e);
        },
        () => {
          this._imgObserver?.unobserve(e), this._lifecycle(a.ERROR, e), this._lazyOptions.errorImg && e.getAttribute("src") !== this._lazyOptions.errorImg && e.setAttribute("src", this._lazyOptions.errorImg), console.error(
            `${this._logMsgPrefix} 图片加载失败，图片 url 地址是：${e.getAttribute(
              l.ORIG_SRC
            )}`
          );
        }
      );
    }
  }
  /**
   * @description - 监听图片加载成功/失败状态的回调函数
   * @param imgEl
   * @param successCallback
   * @param errorCallback
   * @memberof Lazy
   * @returns
   */
  _listenImgStatus(e, t, o) {
    e.onload = t, e.onerror = o;
  }
  /**
   * @description - 清除加载延迟器
   * @param imgEl - 懒加载图片元素对象
   */
  clearLazyTimeout(e) {
    e.hasAttribute(l.TIMEOUT_ID) && (clearTimeout(Number(e.getAttribute(l.TIMEOUT_ID))), e.removeAttribute(l.TIMEOUT_ID));
  }
  /**
   * @description - 判断如果存在图片加载状态的回调函数，则执行它
   * @param lifecycle
   * @param imgEl
   * @memberof Lazy
   * @returns
   */
  _lifecycle(e, t) {
    const { lifeFunc: o } = this._lazyOptions;
    switch (e) {
      // 判断是否执行图片加载中状态的回调函数
      case a.LOADING:
        t.setAttribute(l.LOAD_STATUS, a.LOADING), o && typeof o[a.LOADING] == "function" && o[a.LOADING]?.(t);
        break;
      // 判断是否执行图片加载完成状态的回调函数
      case a.LOADED:
        t.setAttribute(l.LOAD_STATUS, a.LOADED), o && typeof o[a.LOADED] == "function" && o[a.LOADED]?.(t);
        break;
      // 判断是否执行图片加载失败状态的回调函数
      case a.ERROR:
        t.setAttribute(l.LOAD_STATUS, a.ERROR), o && typeof o[a.ERROR] == "function" && o[a.ERROR]?.(t);
        break;
    }
  }
};
// 组件递增实例ID
c(u, "instId", 0);
let C = u;
const z = D({
  // 定义组件名字
  name: "LazyLoadImgs",
  // 声明接收 props
  props: {
    // 用于接收支持 v-html 指令渲染 html 字符串数组的双向梆定参数
    [d ? "value" : "modelValue"]: {
      type: [String, Array],
      required: !1
    },
    // 懒加载选项参数配置
    lazyOptions: {
      type: Object,
      required: !1,
      default: () => E(m)
    },
    // observer 选项参数配置
    observerOptions: {
      type: Object,
      required: !1,
      default: () => E(y)
    },
    // 由 Props 传入的自定义比如从后端获取的文章信息列表中每篇文章的 html 内容字段名，
    // 使用 v-html 指令渲染 html 格式的文章内容时，必须传该参数
    htmlFieldName: {
      type: String,
      required: !1
    }
  },
  // 定义接收自定义事件或 v-model 双向梆定事件参数（Vue2 无须定义 emits）
  emits: d ? [] : ["update:modelValue"],
  // setup 勾子函数
  // 经测试 Vue2 中在 onBeforeMount 钩子中直接使用 setup(props,{slots}) 解构的 slot.default 为空，
  // 需使用 const app = getCurrentInstance(); const defaultSlotVnodes = app.slots.default;
  setup(A, {
    emit: e,
    attrs: t
    /* , slots */
  }) {
    d ? console.log("这里是 Vue2 环境...") : H && console.log("这里是 Vue3 环境...");
    const o = Object.assign({}, m, A.lazyOptions), s = Object.assign(
      {},
      y,
      A.observerOptions
    ), g = new C(o, s, A.htmlFieldName);
    let i = C.instId;
    const r = O();
    let Q;
    const B = () => {
      let I = [];
      return T.startsWith("2.6") ? I = r?.slots?.default : I = q().default?.(), I;
    };
    return h(() => {
      const I = B();
      console.log("default slot vnodes:", I);
      const n = d ? A.value : A.modelValue;
      g.setImgSrcToLoadingImg(I, n, e);
    }), b(async () => {
      Q = g.createImgObserver();
      const I = document.querySelectorAll(`img[${l.IMG_ID}^=inst${i}-]`);
      await F(o.loadingImg, i).catch((n) => n), Array.prototype.forEach.call(I, (n) => Q.observe(n));
    }), P(() => {
    }), G(() => {
    }), L(() => {
      const I = document.querySelectorAll(
        `img[${l.IMG_ID}^=inst${i}-][${l.TIMEOUT_ID}]`
      );
      Array.prototype.forEach.call(I, (n) => g.clearLazyTimeout(n));
    }), N(() => {
      C.instId--, Q.disconnect();
    }), {
      // 暴露本组件实例对应的实例ID（实则 Lazy 类的递增实例ID）
      instId: i
    };
  }
}), X = (A, e) => {
  const t = A.__vccOpts || A;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, _ = { class: "lazyload-all-box" };
function $(A, e, t, o, s, g) {
  return x(), W("div", _, [
    Y(A.$slots, "default")
  ]);
}
const AA = /* @__PURE__ */ X(z, [["render", $]]), eA = [AA], lA = (A, e = {}) => {
  Object.assign(m, e), eA.forEach((t, o) => {
    A.component(t.name, t), console.log("comp.name:", t.name, t);
  });
};
export {
  AA as LazyLoadImgs,
  lA as default
};
//# sourceMappingURL=lazy-load-imgs.es.js.map
