import { isVue2, createApp, version as vueVersion } from 'vue-demi';
import '@/assets/css/base.scss';
import App from './App.vue';

console.log('Vue version:', vueVersion);

const app = createApp(App);

if (isVue2) {
  // @ts-ignore Vue3 的 app 实例的 config 属性没有 productionTip 属性
  app.config.productionTip = false;
  // @ts-ignore Vue3 的 app 实例的 config 属性没有 devtools 属性
  app.config.devtools = false;
}

app.mount('#app');
