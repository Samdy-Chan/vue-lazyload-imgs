// import Vue from 'vue';
import { isVue2, createApp, version as vueVersion } from 'vue-demi';
// import './style.css';
import App from './App.vue';

console.log('Vue version:', vueVersion);

// 创建 Vue app 实例
const app = createApp(App);

// Vue2 版本判断，Vue2.6/2.7 版本都需要这样关闭控制台的生产提示和开发者工具提示
if (isVue2) {
  // 去掉控制台的非生产版本提示和 devtools 提示
  // @ts-ignore Vue3 的 app 实例的 config 属性没有 productionTip 属性
  app.config.productionTip = false;
  // @ts-ignore Vue3 的 app 实例的 config 属性没有 devtools 属性
  app.config.devtools = false;

  // 可以不引入 composition-api，只是 lazy-imgs.vue 会报TS类型错误而已，不影响运行；
  // 这个要放在以上 app.config 配置项之后，否则以上 app.config 不生效；
  // 经测试，main.ts 中的 await import() 语句会自动提升到顶部执行，所以 if 中的判断对此无效
  // @ts-ignore
  // const CopositionApi = (await import('@vue/composition-api')).default;  // 开启后，切换到 Vue3 运行会报找不到此模块
  // Vue.use(CopositionApi); // 不能开启注册 composition-api，会重新加载组件的钩子函数
}

// 挂载 app 实例的渲染内容到 index.html 的 div#app 容器中
app.mount('#app');
