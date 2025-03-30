import { defineConfig, type PluginOption } from 'vite';

import { isVue3, version as vueVersion } from 'vue-demi';

let vue3,
  vue2,
  vue27,
  legacy,
  vueTemplateBabelCompiler,
  scriptSetup,
  isVue2 = false,
  isVue27 = false;

if (isVue3) {
  // @ts-ignore
  vue3 = (await import('@vitejs/plugin-vue')).default;
} else {
  if (vueVersion.startsWith('2.7.')) {
    isVue27 = true;
  } else {
    isVue2 = true;
  }

  // @ts-ignore
  legacy = (await import('@vitejs/plugin-legacy')).default;

  if (isVue2) {
    // @ts-ignore
    vue2 = (await import('vite-plugin-vue2')).createVuePlugin;
    // @ts-ignore
    vueTemplateBabelCompiler = (await import('vue-template-babel-compiler')).default;
    // @ts-ignore
    scriptSetup = (await import('unplugin-vue2-script-setup/vite')).default;
  } else if (isVue27) {
    // @ts-ignore
    vue27 = (await import('@vitejs/plugin-vue2')).default;
  }
}

import path from 'node:path';

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import dts from 'vite-plugin-dts';

import terser from '@rollup/plugin-terser';

const resolve = (url: string) => {
  return path.resolve(__dirname, url);
};

const regVuePlugins = () => {
  let VuePlugins: PluginOption[] = [];

  if (isVue3) {
    VuePlugins = [vue3()];
  } else if (isVue2) {
    VuePlugins = [
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
    ];
  } else {
    VuePlugins = [
      vue27(),
      // @vitejs/plugin-legacy 插件只支持构建兼容旧浏览器的 Vue 应用，而不支持构建库，本例是在 build.lib 节点中配置了
      // 构建 Vue 组件库 lazy-load-imgs.vue，所以注释掉，否则报错：@vitejs/plugin-legacy does not support library mode.
      /* legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }), */
    ];
  }

  return VuePlugins;
};

export default defineConfig({
  root: './',
  base: './',
  publicDir: '',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json'],
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },

  plugins: [
    ...(regVuePlugins() as any),
    cssInjectedByJsPlugin(),
    dts({
      include: ['index.ts', 'src/**/*.{ts,d.ts,vue}'],
      exclude: ['dist', 'src/{App,main}.{ts,js,vue}', 'src/vite-env.d.ts'],
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
      copyDtsFiles: true,
    }),
    terser({
      compress: {
        drop_console: ['log', 'info'],
        drop_debugger: true,
      },
    }),
  ],

  define: {
    'process.env': process.env,
  },

  build: {
    outDir: `dist/vue${isVue3 ? '3' : isVue2 ? '2' : '2.7'}`,
    target: 'es2020',
    lib: {
      entry: `index.ts`,
      name: 'LazyLoadImgs',
      fileName: 'lazy-load-imgs',
      formats: ['es', 'umd'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue' /* , 'vue-demi' */],
      output: {
        entryFileNames: 'lazy-load-imgs.[format].js',
        manualChunks: undefined,
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
        },
        exports: 'named',
      },
    },
  },

  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
