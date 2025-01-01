import { defineConfig } from 'vite';

import { isVue3 } from 'vue-demi';

let vue3, vue2, legacy, vueTemplateBabelCompiler, scriptSetup;
if (isVue3) {
  // @ts-ignore
  vue3 = (await import('@vitejs/plugin-vue')).default;
} else {
  // @ts-ignore
  vue2 = (await import('vite-plugin-vue2')).createVuePlugin;
  // @ts-ignore
  legacy = (await import('@vitejs/plugin-legacy')).default;
  // @ts-ignore
  vueTemplateBabelCompiler = (await import('vue-template-babel-compiler')).default;
  // @ts-ignore
  scriptSetup = (await import('unplugin-vue2-script-setup/vite')).default;
}

// 导入路径处理模块
import path from 'node:path';

// 导入可以将 css 代码打包进 js 文件的插件
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// 导入可以将对应的 *.ts/*.tsx/*.vue 文件打包生成对应的 *.d.ts 类型声明文件及复制存在的 *.d.ts 文件到 outDir 目录的插件
import dts from 'vite-plugin-dts';

// 自定义自动拼接 path.resolve 第一个当前路径参数的函数
const resolve = (url: string) => {
  return path.resolve(__dirname, url);
};

// https://vitejs.dev/config/
// 方法一：默认生成的此配置文件是传参对象配置法
// export default defineConfig({...})
// 方法二：采用回调函数配置法，可以解构获取一些当前运行环境的参数，可以根据环境进行配置
export default defineConfig({
  // 项目根目录（index.html 文件所在的位置），默认为 ./
  root: './',
  // 项目基础目录，默认为 ./
  base: './', // 只能为 ./ 或空串 ''
  // 静态资源目录，默认 public
  // publicDir: 'public',
  publicDir: '', // 默认会自动打包 public 目录下所有文件到 dist 目录中，但不包含 public 文件夹，修改后，不打包 public

  // 路径别名配置
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json'],
  },

  // 用于解决开发阶段控制台的警告：
  // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'], // 官网方法，兼容 Vue2/Vue3，Vue2 必须用这个才有效
        // api: 'modern-compiler', // 用这个也可以
      },
    },
  },

  // 插件配置
  plugins: [
    isVue3
      ? vue3()
      : [
          vue2({
            jsx: true,
            vueTemplateOptions: {
              compiler: vueTemplateBabelCompiler,
            },
          }),
          scriptSetup(),
          // @vitejs/plugin-legacy 插件只支持构建兼容旧浏览器的 Vue 应用，而不支持构建库，本例是在 build.lib 节点中配置了
          // 构建 Vue 组件库 lazy-load-imgs.vue，所以注释掉，否则报错：@vitejs/plugin-legacy does not support library mode.
          /* legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }), */
        ].flat(Infinity), // 打平解构 Vue2 相关插件

    cssInjectedByJsPlugin(),
    dts({
      // 参数对象里也可以配置 root/outDir/compilerOptions 参数，覆盖 vite.config.ts 和 tsconfig.json 的参数
      // include 参数是相对于以上顶级的 root 参数路径，
      // 用于覆盖 tsconfigPath 中的 include 配置项，即要生成哪些文件的 *.d.ts 文件，
      // 值可以为字符串或数组，也可以用 glob 路径匹配模式
      include: [
        'index.ts',
        'src/**/*.{ts,d.ts,vue}', // 模式匹配文件及扩展名之间不要有空格
      ],

      // 排除要打包的目录或文件，默认不会打包 App.vue
      exclude: ['dist', 'src/{App,main}.{ts,js,vue}', 'src/vite-env.d.ts'],

      // tsconfigPath 参数也是相对于以上顶级的 root 参数路径，默认 root 为 项目根目录 ./
      // 如果 root 变了，或默认的 tsconfig.json 文件中没有包含 include 等包含打包文件的参数，必须要配置该参数
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),

      // 打包时，如果 include 参数指定的路径中有存在的 .d.ts 文件，则直接复制到 outDir 参数的目录中
      copyDtsFiles: true,
    }),
  ],

  // 自己加：自定义变量配置
  define: {
    'process.env': process.env,
  },

  // vue组件打包配置
  build: {
    outDir: `dist/vue${isVue3 ? '3' : '2'}`, // 会自动接拼上 root 配置项的路径，默认重新打包前会自动清空该目录，再重新生成
    target: 'es2020',
    lib: {
      entry: `index.ts`, // 会自动接拼上 root 配置项的路径
      name: 'LazyLoadImgs',
      fileName: 'lazy-load-imgs',
      formats: ['es', 'umd'], // 缺省值就是 ['es', 'umd']
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi'],
      output: {
        // 入口模块的输出文件名，[name]为 build.lib.entry 的文件名，如 index，所以这里不用[name]
        entryFileNames: 'lazy-load-imgs.[format].js',
        // chunkFileNames: 'chunk-[hash].js', // 非入口模块(如动态模块)的输出文件名
        // assetFileNames: 'assets/[name]-[hash][extname]', // 静态资源文件输出文件名
        // 配合 vite-plugin-css-injected-by-js 插件 cssInjectedByJsPlugin 将 css 打包进 js 文件
        // 配合 vite-plugin-css-injected-by-js 插件 cssInjectedByJsPlugin 将 css 打包进 js 文件
        manualChunks: undefined,
        // 在 umd 或 life 构建模式下为这些外部化依赖提供一个全局变量名
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
        },
        // 如果打包入口文件中包含了 export varName 或 export {...} 命名导出，请使用设置参数值为 'named'，
        // 如果既有命名导出，也有默认导出，请在 tsconfig.json 中设置 esModuleInterop: true，否则当使用
        // CommonJS 形式时，要使用 require('index.js').default 才能默认导入
        exports: 'named',
      },
    },
  },

  // 你需要选择退出预 bundling 才能让 vue-demi 正常工作，vue-demi 库可用于构建打包为 vue2/vue3 通用的组件库
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
