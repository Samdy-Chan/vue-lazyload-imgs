// import Vue from 'vue';
import { isVue2, createApp } from 'vue-demi';
// import './style.css';
import App from './App.vue';

const app = createApp(App);

if (isVue2) {
  // 去掉控制台的非生产版本提示和 devtools 提示
  // @ts-ignore
  app.config.productionTip = false;
  // @ts-ignore
  app.config.devtools = false;

  // 可以不引入 composition-api，只是 lazy-imgs.vue 会报TS类型错误而已，不影响运行；
  // 这个要放在以上 app.config 配置项之后，否则以上 app.config 不生效
  // @ts-ignore
  // const CopositionApi = (await import('@vue/composition-api')).default;
  // Vue.use(CopositionApi); // 不能开启注册 composition-api，会重新加载组件的钩子函数
}

app.mount('#app');
