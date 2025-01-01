import path from 'node:path';
import fs from 'node:fs';

try {
  // 获取当前的 Vue 版本
  let Vue = (await import('vue')).default; // 获取 Vue2 版本方式
  var version = '';
  if (Vue?.version) {
    version = Vue.version;
  } else {
    version = (await import('vue')).version; // 获取 Vue3 版本方法
  }
} catch (e) {
  throw new Error(
    `[vue-lazylod-imgs]: Please install Vue first, and then reinstall this component library: npm install @samdy-chan/vue-lazyload-imgs.\n${e}`
  );
}

// 判断当前是 es、commonjs，还是 umd 模块环境
let moduleType = import.meta
  ? 'es'
  : typeof exports === 'object' && typeof module !== 'undefined'
  ? 'cjs'
  : 'umd';

// 判断当前使用的 Vue 版本
let vue_version = version.startsWith('3') ? '3' : '2';

// 根据当前的 Vue 版本，释放（复制）dist/vue2 或 dist/vue3 目录下的文件到 dist 目录下
try {
  let srcDir = path.resolve(import.meta.dirname, `./dist/vue${vue_version}/`);
  let destDir = path.resolve(import.meta.dirname, `./dist/`);
  fs.cpSync(srcDir, destDir, { errorOnExist: false, force: true, recursive: true });
} catch (e) {
  throw new Error(`[vue-lazylod-imgs]: Copying files error.\n${e}`);
}
