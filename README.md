### **🚀 项目描述**

**【注】：本项目由于集成了 Vue2/Vue3 打包/运行 双环境，需要在项目根目录下的 node_modules 链接符链接到 vue2 或 vue3 目录下的 node_modules 目录，必须使用【yarn】 打包工具运行和打包本项目，因为 npm 或 pnpm 打包工具，在执行 npm install 或 pnpm install/add 命令安装包后，根目录下的 node_modules 链接符会失效，变成真实目录了！！**

&emsp;&emsp;本项目的配置文件 tsconfig.json 或 vite.config.ts 等主要是在 Vue3 的基础上配置的，但也兼容 Vue2 环境。

&emsp;&emsp;本项目集成了 Vue2/Vue3 双环境，通过执行 yarn switch 2 或 3 命令调用执行 switch-vue.js 脚本切换到 Vue2/Vue3 环境，再通过 yarn dev 或 yarn build 命令运行，或打包项目根目录下的 index.ts 入口文件。本案例是打包 /src/components/lazy-load-imgs.vue 图片懒加载组件。

&emsp;&emsp;并且编写了包配置文件 package.json 中的 scripts.postinstall：
```json
"scripts": {
    /**
     * ./index.js 是打包 lazy-load.img.vue 组件并发布到 npm 后，@samdy-chan/vue-lazyload-imgs
     * 包中根目录下的 index.js 文件，用于在执行 npm i @samdy-chan/vue-lazyload-imgs 安装本组件包后，
     * 自动执行该脚本，自动根据当前是 Vue2 还是 Vue3 环境，释放（复制） dist/vue2 或 dist/vue3 目录下
     * 的文件到 dist 目录下，供当前的 Vue 版本使用本图片懒加载组件 @samdy-chan/vue-lazyload-imgs。
     */
    "postinstall": "node ./index.js"
}
```


<br/>

### **🚀 使用方法**

- ##### 首次使用本项目，需在项目根目录下执行 cd vue2 && yarn install 和 cd vue3 && yarn install 分别安装 vue2 和 vue3 环境相关依赖包；

- ##### 然后在项目根目录下执行 mklink /j node_modules vue2/node_modules 或 vue3/node_modules 命令链接到 vue2 或 vue3 的依赖包目录，这是 Windows 目录链接命令， Linux 请使用 ln -s ./vue2/node_modules ./node_modules 命令；

- ##### 执行 yarn switch 2 或 3 切换到 Vue2/Vue3 环境；

- ##### 执行 yarn build 可打包当前 Vue 版本环境的 /src/components/lazy-load-imgs.vue 组件及其相关文件和TS类型声明文件到项目根目录的 dist/vue2 或 dist/vue3 目录下；

- ##### 执行 yarn dev 可运行当前 vue 版本环境。


<br/>

### **🚀 注意事项**

- ##### tsconfig.json、tsconfig.app.json 这两个 TS 配置文件内的现有注释及其下的配置项，请不要修改或删除（包括空格数或缩进格式），因为执行 yarn switch 2 或 2.7 或 3 命令切换 Vue 版本调用的 switch-vue.js 程序文件会根据现有的一些注释及配置项位置，根据要切换的 Vue 版本进行动态添加/修改/删除一些配置项；不使用 JSON.stringify 和 JSON.parse 来转换配置 json 文件，是因为这种方法不保留注释。


<br/>

### **🚀 CHANGELOG（版本变更历史）**
- **v1.0.0** : 完成了实现图片懒加载功能的开发与测试，包括懒加载模板中 html 标签内的 \<img\> 标签的图片，及懒加载 Vue 内置的 v-html 指令值梆定的 html 字符串内的 \<img\> 标签的图片。

- **v1.0.1** : 优化代码，删除多余的代码；修改 package.json 中的对等依赖配置。
