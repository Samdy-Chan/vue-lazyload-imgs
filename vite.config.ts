import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
export default defineConfig(({ command, mode, isSsrBuild, isPreview }): UserConfig => {
  /**
   * 输出当前运行环境变量
   * command：开发模式(dev)时，值为 serve；生产构建模式(build)，值为 build
   * mode：开发环境，值为 development；生产环境，值为 production
   * isSsrBuild：是否为服务器端渲染构建，针对 NuxtJS 构架，Vue 框架值为 false
   * isPreview：是否为预览模式，执行 npm run preview 或 vite preview 时，值为 true
   */
  // 开发环境，输入：serve development false false
  console.log(
    '输出当前运行环境变量 command, mode, isSsrBuild, isPreview:',
    command,
    mode,
    isSsrBuild,
    isPreview
  );

  /**
   * loadEnv()：读取环境变量配置文件 .env
   * 参数一 mode：开发环境，值为 development；生产环境，值为 production
   * 参数二：要读取的 .env 环境变量配置文件的路径，如果 mode 值为 development，会读取 .evn + .env.development
   * 如果 mode 值为 production，会读取 .env + .env.production
   * 参数三：要读取的环境变量的前缀，默认为''，表示读取全部环境变量，包括 node 和操作系统的很多环境变量等，
   * 建议加下划线，可以过滤一些不包含下线线的变量
   */
  const myEnv = loadEnv(mode, process.cwd(), 'APP_');
  console.log('myEnv:', myEnv);

  return {
    // 项目根目录（index.html 文件所在的位置），默认为 ./
    root: './',
    // 项目基础目录，默认为 ./
    base: './', // 只能为 ./ 或空串 ''
    // 静态资源目录，默认 public
    // publicDir: 'public',
    // publicDir: '', // 默认会自动打包 public 目录下所有文件到 dist 目录中，但不包含 public 文件夹，修改后，不打包 public

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
          // silenceDeprecations: ['legacy-js-api'],  // 官网方法
          api: 'modern-compiler', // 用这个也可以
        },
      },
    },

    // 插件配置
    plugins: [
      vue(),
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
      outDir: `dist`, // 会自动接拼上 root 配置项的路径，默认重新打包前会自动清空该目录，再重新生成
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
  };
});
