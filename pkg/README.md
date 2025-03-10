<div style="color:#666;">

## vue-lazyload-imgs

<br/>

## **一、本组件简介**

- #### **适用环境**：本组件适用于运行在前端开发框架 Vue，同时兼容 Vue2（>=2.6.0）及 Vue3 版本；要求 Vue 版本必须在 2.6.0（包含） 以上及 Vue 3.x 版本，**即 "vue": ">=2.6.0 || ^3.0.0"**；

- #### **功能简介**：vue-lazyload-imgs 本组件用于实现在 \>=2.6.0 及 3.x 的 Vue 版本中实现图片的懒加载功能。将包裹在本组件内的所有 html 深层次结构内的图片标签 \<img\> 实现懒加载功能，初始进入页面及随着页面滚动，只有进入页面窗口可视范围内的图片才会加载显示，从而提升页面的加载速度和用户体验；

- #### **组件特性**：本组件（图片懒加载组件）具有如下特性：
  1. 本组件可一性实现懒加载任意数量的图片，而不是像某些图片懒加载指令那样，每个\<img\>图片标签都要添加 v- 开头的自定义图片懒加载指令；本组件只需要将要加载的任意数量的\<img\>图片标签包裹起来（即把要加载的所有图片及其父标签作为本组件 LazyLoadImgs 的默认插槽内容），\<img\>图片标签可以嵌套任意层次，并且\<img\>图片标签可以在任何其它合法的 html 标签内，具体可查看【使用方法】部分）。

&emsp;&emsp;<span style="color:green;font-weight:bold;">2. 本组件还支持实现懒加载由 v-html 指令梆定的 html 字符串内容里面的\<img\>图片，这些场景特别适用于一些带有图片的文章或留言内容，在 Vue3 中，使用本组件渲染 v-html 指令梆定的 html 内容时，必须与本组件标签内的 v-model 指令搭配使用，否则本组件包裹内（即默认插槽内）的使用了 v-html 指令梆定的 html 内容里的 \<img\> 图片不能实现懒加载，这是由于 Vue3 对使用 v-html 指令渲染 html 内容的虚拟节点渲染原理所需；<br/>
在 Vue2 环境下，使用本组件渲染 v-html 指令梆定的 html内容时，可以不在本组件标签内设置 v-model 指令和 htmlFieldName 参数也可以，不过为了使用本组件时，与 Vue3 代码保持一致，及方便迁移到 Vue3 环境，建议 Vue2 环境下也加入 v-model 指令和 htmlFieldName 参数；<br/>
详细请查看【Props 参数说明】部分，示例代码如下：</span>
```jsx
// 如下 v-for 循环的 key 参数请保证使用唯一值（也可安装使用 nanoid 包生成唯一值），不建议采用数组索引 index
// keyFieldName 参数：要渲染的每个对象中的包含 html 内容的字段/属性名，
// 如果 v-model 指令值不是像本例的包含要渲染的 html 内容的对象数组，而是一项简单的 html 字符串，则不需要设置 keyFieldName 参数
<template>
  <LazyLoadImgs v-model="articleList">
    <div 
      v-for="{artId, content} in articleList"
      :key="artId"
      v-html="content"
      keyFieldName="content"
    >
    </div>
  </LazyLoadImgs>

  <!-- 【注】：如果本组件标签内的 v-model 指令值不是如上的对象数组，而是 html 字符串（即只需要渲染一项 html 内容），则直接把在块标签如 div 标签内的 v-html 指令值设置为和在本组件标签内的 v-model 指令值一样的响应式 html 字符串变量即可，也不用再设置 htmlFieldName 参数，如下：
  -->
  <LazyLoadImgs v-model="oneArticle">
    <div v-html="oneArticle"></div>
  </LazyLoadImgs>
</template>

<script setup>
  import { ref } from 'vue';

  // 由本组件的 v-model 指令梆定的包含要渲染 html 内容字段的对象数组列表，
  // 要求数组中的每个对象至少要包含表示唯一ID和要渲染的 html 字符串的两个属性
  const articleList = ref([
    {
      artId: 1,  // 唯一ID（必须）
      author: 'Samdy_Chan'
      title: '文章1标题',
      content: '<p>这是文章1内容 <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" /></p>',  // 要渲染的 html 字符串（必须）
      createTime: '2025-01-01 12:30:01'
    },
    {
      artId: 2,
      author: 'Andy_Lau'
      title: '文章2标题',
      content: '<p>这是文章2内容 <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" /></p>',
      createTime: '2025-01-03 21:45:32'
    }
  ]);

  // 渲染模板中，第二个<LazyLoadImgs>组件的 v-model 指令梆定的只渲染一项 html 内容
    const oneArticle = `
      <div>
        <p>这是只渲染一篇文章内容</p>
        <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />
      </div>
    `;
</script>

// 【注】：本组件只支持懒加载标准 html 标签内的<img>图片，不支持将其它组件（假定如下的 <MyImgList> 组件封装了很多<img>图片标签，则将 <MyImgList> 组件放在本组件 <LazyLoadImgs> 默认插槽内，是不能实现懒加载 <MyImgList> 组件内的图片的，这是 Vue 的虚拟节点渲染结构导致。
// 【如下是不能实现懒加载效果的】：
<template>
  <LazyLoadImgs>
    <!-- 不能实现懒加载 MyImgList 组件内的图片， 本组件 LazyLoadImgs 只能包裹标准的 html 标签。
    请在 MyImgList 组件中，使用本 LazyLoadImgs 组件包裹要懒加载的<img>图片标签即可。
    -->
    <MyImgList />
  </LazyLoadImgs>
</template>
```

<br/>

## **二、安装方法**

```bash
## npm
npm install vue-lazyload-imgs

## yarn
yarn add vue-lazyload-imgs

## pnpm
pnpm add vue-lazyload-imgs
```

<br/>

## **三、使用方法**
- ### 在 html 标签如 div 里使用 v-html 指令渲染 html 内容及实现懒加载 html 内容里的 \<img\> 图片，请查看以上【本组件简介->组件特性】第二部分。 v-html 指令需要与本组件内的 v-model 指令以及 Props 参数 htmlFieldName 一起使用。

- ### **方法一：全局使用**
### **&emsp;&emsp;全局注册 For Vue2（Vue >=2.6.x，并且 <=2.7.x）：**
```js
// main.ts or main.js

import Vue from 'vue';

import App from './App.vue';

// 为 Vue2.6.x 导入 @vue/composition-api 插件（Vue2.7.x 自动集成，无须执行此行）
import VueCompositionApi from '@vue/composition-api';  // Only for Vue2.6.x

// 使用默认导入方式导入本组件
import LazyLoadImgs from 'vue-lazyload-imgs';

// 为 Vue2.6.x 注册 @vue/composition-api 插件（Vue2.7.x 自动集成，无须执行此行）
Vue.use(VueCompositionApi);  // Only for Vue2.6.x

// 【可选】：可配置在以下使用 Vue.use 全局注册本组件时，传入该 lazyOptions 对象配置参数，
// 作为像局部使用本组件时，传递的 Props 参数。
// 这样，在各页面及组件文件中使用本组件时，可不用再传递 Props 参数，这里配置的 lazyOptions 参数是用户为本组件定义的默认参数。
/* 
const lazyOptions = {
  loadingImg: 'https://img.soogif.comB84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg',
  errorImg: 'https://www.91ajs.com/content-data/upload/202303/202303071603195893.png',
  delay: 3000,
  lifeFunc: {
    loading: (img: HTMLImageElement) => {
      console.log('图片加载中', img);
    },
    loaded: (img: HTMLImageElement) => {
      console.log('加载图片成功，图片地址是：', img.src, img);
    },
    error: (img: HTMLImageElement) => {
      console.log('加载图片失败，图片地址是：', img.src, img);
    },
  },
};
*/

// 全局注册本组件：缺省不传该 lazyOptions 参数，本组件也提供了内置的 Props 参数，
// 详见【Props & Events/参数和事件说明】部分。
Vue.use(LazyLoadImgs /*, lazyOptions */);


new Vue({
    render: h => h(App)
}).$mount('#app');
```

<br/>

### **&emsp;&emsp;全局注册 For Vue3（Vue >=3.x.x）：**
```js
// main.ts or main.js

import { createApp } from 'vue';

import App from './App.vue';

// 使用默认导入方式导入本组件
import LazyLoadImgs from 'vue-lazyload-imgs';


const app = createApp(App);

// 【可选】：可配置在以下使用 app.use 全局注册本组件时，传入该 lazyOptions 对象配置参数，
// 作为像局部使用本组件时，传递的 Props 参数。
// 这样，在各页面及组件文件中使用本组件时，可不用再传递 Props 参数，这里配置的 lazyOptions 参数是用户为本组件定义的默认参数。
/* 
const lazyOptions = {
  loadingImg: 'https://img.soogif.comB84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg',
  errorImg: 'https://www.91ajs.com/content-data/upload/202303/202303071603195893.png',
  delay: 3000,
  lifeFunc: {
    loading: (img: HTMLImageElement) => {
      console.log('图片加载中', img);
    },
    loaded: (img: HTMLImageElement) => {
      console.log('加载图片成功，图片地址是：', img.src, img);
    },
    error: (img: HTMLImageElement) => {
      console.log('加载图片失败，图片地址是：', img.src, img);
    },
  },
};
*/

// 全局注册本组件：缺省不传该 lazyOptions 参数，本组件也提供了内置的 Props 参数，
// 详见【Props 参数说明】部分。
app.use(LazyLoadImgs /*, lazyOptions */);

app.mount('#app');
```

```jsx
<!-- App.vue -->
<!-- 以上全局注册本组件后，在其它任何页面及组件中（如App.vue） 中无须导入，即可以直接使用本组件 -->
<template>
  <!-- 1、采用默认 Props 参数使用本组件（默认参数值详见以下的【Props 参数说明】部分） -->
  <LazyLoadImgs>
    <div class="container">
      <img src="https://tb2.bdstatic.com/tb/static-common/img/search_logo_big_v2_d84d082.png" />
    
      <section class="aside">
        <div class="aside-left">
          <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />
        </div>
      </section>
    </div>
  </LazyLoadImgs>

    <!-- 2、指定自定义 Props 参数使用本组件（可传递的参数和事件回调及说明详见以下的【Props 参数说明】部分），
    Props 使用驼峰或中横线分隔均可，如 :lazy-options 同 :lazyOptions -->
    <LazyLoadImgs :lazy-options="lazyOptions" :observer-options="observerOptions">
      <img src="https://tb2.bdstatic.com/tb/static-common/img/search_logo_big_v2_d84d082.png" />
    </LazyLoadImgs>
</template>

<script setup>
  import { ref } from 'vue';

  // 配置本懒加载组件 LazyLoadImgs 的 Props 参数
  const lazyOptions = ref({
    loadingImg: 'https://img.soogif.comB84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg',
    errorImg: 'https://www.91ajs.com/content-data/upload/202303/202303071603195893.png',
    delay: 3000,
    lifeFunc: {
      loading: (img: HTMLImageElement) => {
        console.log('图片加载中', img);
      },
      loaded: (img: HTMLImageElement) => {
        console.log('加载图片成功，图片地址是：', img.src, img);
      },
      error: (img: HTMLImageElement) => {
        console.log('加载图片失败，图片地址是：', img.src, img);
      },
    },
  });

  // 图片进入可视区监听器参数配置：建议缺省（不用指定）该参数，采用默认值即可
  const observerOptions = {
    // 图片进入可视交叉状态的根容器，默认为浏览器视口(null)，建议取默认值 null 即可
    root: null,
    // 根容器 margin 值，建议取默认值 0px 即可
    rootMargin: '0px',
    // 图片进入与根容器交叠重叠范围的百分比(0-1之间)，即进入可视范围多少百分比后，进行加载，建议取默认值为 0 即可（刚进入可视边界即加载）
    threshold: 0
  };
</script>
```


<br/>

- ### **方法二：局部（组件内）使用**
```js
// 如在 App.vue 或其它组件中使用本组件

// 需使用分别导入方式导入本组件（因为全局注册使用了默认导入方式）
import { LazyLoadImgs } from 'vue-lazyload-imgs';

// 本组件在 <template></template> 模板标签中使用的方式和传递参数和如上的【全局使用】方法相同。
```

<br/>

## **四、Props 参数说明**
- #### **以下所有参数均具有默认值，均为可选参数，绝大多数情况下，本组件不用指定以下任何参数，即可实现图片懒加载功能。**

<!-- observerOptions 参数说明部分 -->
<table>
  <tr>
    <th colspan="2" style="text-align:center;">lazyOptions 对象参数（懒加载参数配置对象）</th>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>object</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>懒加载配置对象，包括默认预加载图片、加载失败显示的图片、加载中/加载成功/加载失败后的处理回调函数等</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>
<code>
<pre>
{
  loadingImg: DEFAULT_LOADING_IMG,
  errorImg: DEFAULT_ERROR_IMG,
  // lifeFunc 默认实际为 undefined，以下只是为了说明其每个属性都是一个函数
  lifeFunc: {
    loading: (img: HTMLImageElement) => {},
    loaded: (img: HTMLImageElement) => {},
    error: (img: HTMLImageElement) => {}
  }, 
  delay: 500
}
</pre>
</code>
    </td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.loadingImg</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>string</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片加载中状态显示的图片url或base64编码</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>组件内置的默认加载中状态图片（base64编码）</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.errorImg</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>string</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片加载失败状态显示的图片url或base64编码</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>组件内置的默认加载失败状态图片（base64编码）</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.lifeFunc</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>object</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片各加载状态回调函数（默认不执行图片加载状态回调函数，需要的话，指定即可）</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>undefined</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.lifeFunc.loading</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>
      Function <br/>
      (imgEl: HTMLImageElement, ...args: any[]) => any
    </td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片加载中（开始加载）的回调函数</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>undefined</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.lifeFunc.loaded</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>
      Function <br/>
      (imgEl: HTMLImageElement, ...args: any[]) => any
    </td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片加载成功（加载完成）后的回调函数</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>undefined</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.lifeFunc.error</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>
      Function <br/>
      (imgEl: HTMLImageElement, ...args: any[]) => any
    </td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片加载失败后的回调函数</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>undefined</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>lazyOptions.delay</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>number</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片进入可视范围后，延迟多久加载图片（单位ms）</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>500</td>
  </tr>
</table>

<br/>

<!-- htmlFieldName 参数说明部分 -->
<table>
  <tr>
    <th colspan="2" style="text-align:center;">v-model指令 / v-html指令 / htmlFieldName参数 配置<br/>
    （使用 v-html 指令渲染比如带有 &lt;img&gt; 的 html 内容需配置这三个参数）<br/>
    这三个参数的使用示例代码见如上的【本组件简介->组件特性】第二部分
    </th>
  </tr>
  <tr>
    <th>指令名</th>
    <td>v-model</td>
  </tr>
  <tr>
    <th>本组件要求的值类型</th>
    <td>string | object[]
<cdoe>
<pre>
  // 如果 v-model 指令值梆定的响应式变量值是字符串，则必须是包含 html 标签内容的字符串，则 v-html 指令值也必须设置为与 v-model 指令梆定的相同的响应式状态变量；
  <br/>
  // 如果 v-model 指令值梆定的响应式变量值是对象数组类型 object[]，则数组中的每个对象必须要符合发下要求：
  // 以下 id 和 content 是表示唯一ID和要渲染的 html 字符串的两个属性名，这两个属性名可设置为其它名称
  // 要求数组中的每个对象至少要包含表示唯一ID和要渲染的 html 字符串的两个属性
  {
    id: number | string;  // 唯一ID属性名，可以指定其它名称（必须要包含的属性）
    content: string;  // 要渲染的 html 字符串属性名，可以指定其它名称（必须要包含的属性）
    [Other: string]: any;  // 还可以包含其它更多属性
  }[]
</pre>
</code>
    </td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是|否</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>如果需要使用 v-html 指令渲染梆定的 html 内容（如渲染 html 格式的文章内容等），则必须需要使用该参数。值可以是 html 标签字符串（一般是包含有要实现懒加载图片的 &lt;img&gt; 标签及其它 html 标签内容；<br/>
    值也可以是对象数组，其中数组中的每个对象，必须要有一个代表唯一ID的字段/属性（如 id)，及保存有 html 字符串的字段/属性（如 content）；<br>
    需要搭配 v-html 指令和 htmlFieldName 参数使用
    </td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>无</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>指令名</th>
    <td>v-html</td>
  </tr>
  <tr>
    <th>本组件要求的值类型</th>
    <td>string</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是|否</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>此 v-html 指令不是设置在本组件标签内的，是设置在本组件包裹的 html 标签如 div 标签中，指令值为 html 字符串，用于渲染 html 内容；<br/>
    如需渲染 html 格式的文章内容等场景，则需指定该 v-html 指令，需要搭配 v-model 指令和 htmlFiledName 参数使用</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>无</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>htmlFieldName</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>string</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是|否</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>如果在本组件设置了 v-model 指令和通过在本组件包裹的 div 等块标签中设置 v-html 指令渲染 html 内容，并且 v-model 的梆定值不是 html 字符串类型的值，而是对象数组类型 object[] 的值，则需要设置该参数，并且需要设置该参数值为 v-model 指令梆定的对象数组中每个对象中存有要渲染的 html 字符串的属性/字段名，本组件需要根据该 htmlFieldName 参数值查找每个对象中 html 字符串字段/属性中的 &lt;img&gt; 图片标签，加入一些的自定义属性标识，进行实现懒加载图片的功能；
    本 htmlFieldName 参数，一般搭配 v-model 指令和 v-html 指令一起使用</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>undefined</td>
  </tr>
</table>

<br/>

<!-- observerOptions 参数说明部分 -->
<table>
  <tr>
    <th colspan="2" style="text-align:center;">observerOptions 对象参数（可视范围边界值参数配置对象）</th>
  </tr>
  <tr>
    <th>参数名</th>
    <td>observerOptions</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>IntersectionObserverInit（TS内置类型）</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片进入可视区监听器参数配置，<span style="font-weight:bold;color:green">建议采用默认值即可</span></td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>
<code>
<pre>
{
  root: null,
  rootMargin: '0px',
  threshold: 0
}
</pre>
</code></td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>observerOptions.root</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>Element | Document | null</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片进入可视交叉状态的根容器，默认为浏览器视口(null)，建议取默认值 null 即可</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>null</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>observerOptions.rootMargin</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>string</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>根容器 margin 值，建议取默认值 '0px' 即可</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>'0px'</td>
  </tr>
  <tr>
    <td colspan="2">&emsp;</td>
  </tr>
  <tr>
    <th>参数名</th>
    <td>observerOptions.threshold</td>
  </tr>
  <tr>
    <th>类型</th>
    <td>number | number[]</td>
  </tr>
  <tr>
    <th>是否可选</th>
    <td>是</td>
  </tr>
  <tr>
    <th>说明</th>
    <td>图片进入与根容器交叉重叠范围的百分比阀值(0-1之间)，即进入可视范围多少百分比后进行加载，建议取默认值为 0 即可（刚进入可视边界即加载）</td>
  </tr>
  <tr>
    <th>默认值</th>
    <td>0</td>
  </tr>
</table>

<style>
  th {
    width: 80px;
    text-align: right;
  }

  td {
    width: 400px;
  }
</style>

</div>