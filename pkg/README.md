<div style="color:#666;">

## vue-lazyload-imgs

<br/>

## **本组件简介**

- #### **适用环境**：本组件适用于运行在前端开发框架 Vue，同时兼容 Vue2（>=2.6.0）及 Vue3 版本；要求 Vue 版本必须在 2.6.0（包含） 以上及 Vue 3.x 版本，**即 "vue": ">=2.6.0 || ^3.0.0"**；

- #### **功能简介：**vue-lazyload-imgs 本组件用于实现在 \>=2.6.0 及 3.x 的 Vue 版本中实现图片的懒加载功能。将包裹在本组件内的所有 html 深层次结构内的图片标签 \<img\> 实现懒加载功能，初始进入页面及随着页面滚动，只有进入页面窗口可视范围内的图片才会加载显示，从而提升页面的加载速度和用户体验；

<br/>

## **安装方法**

- #### **npm方式**： 
&emsp;&emsp;&emsp;&emsp;npm install vue-lazyload-imgs

- #### **yarn方式：**
&emsp;&emsp;&emsp;&emsp;yarn add vue-lazyload-imgs

- #### **pnpm方式：**
&emsp;&emsp;&emsp;&emsp;pnpm add vue-lazyload-imgs

<br/>

## **使用方法**
- ### **方法一：全局使用**
### **&emsp;&emsp;For Vue2（2.6.x>= Vue <=2.7.x）：**
```js
// main.ts or main.js

import Vue from 'vue';

import App from './App.vue';

// 导入 @vue/composition-api 插件（For Vue2.6.x，Vue2.7.x 自动集成）
import VueCompositionApi from '@vue/composition-api';

// 使用默认导入方式导入本组件
import LazyLoadImgs from 'vue-lazyload-imgs';

// 全局注册本组件
Vue.use(LazyLoadImgs);

// 注册 @vue/composition-api 插件（For Vue2.6.x，Vue2.7.x 自动集成）
Vue.use(VueCompositionApi);


new Vue({
    render: h => h(App)
}).$mount('#app');
```

<br/>

### **&emsp;&emsp;For Vue3（Vue >=3.x.x）：**
```js
// main.ts or main.js

import { createApp } from 'vue';

import App from './App.vue';

// 使用默认导入方式导入本组件
import LazyLoadImgs from 'vue-lazyload-imgs';


const app = createApp(App);

// 全局注册本组件
app.use(LazyLoadImgs);

app.mount('#app');
```

```html
<!-- App.vue -->
<!-- 以上全局注册本组件后，在其它任何页面及组件中（如App.vue） 中无须导入，即可以直接使用本组件 -->
<template>
    <!-- 1、采用默认参数使用本组件（可传递的参数和事件回调及说明详见以下的【Props & Events/参数和事件】部分） -->
    <LazyLoadImgs>

    </LazyLoadImgs>

    <!-- 2、指定自定义参数使用本组件（可传递的参数和事件回调及说明详见以下的【Props & Events/参数和事件】部分） -->
    <LazyLoadImgs>
        
    </LazyLoadImgs>
</template>
```


<br/>

- ### **方法二：局部（组件内）使用**
```js
// 如在 App.vue 或其它组件中使用本组件

// 需使用分别导入方式导入本组件（因为全局注册使用了默认导入方式）
import { LazyLoadImgs } from 'vue-lazyload-imgs';

// 本组件在 <template></template> 模板标签中使用的方式和传递参数和如上的【全局使用】方法相同。
```

</div>