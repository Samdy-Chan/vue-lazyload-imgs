<template>
  <div class="container">
    <h3 class="head-title">LazyLoadImgs (vue-lazyload-imgs) 图片懒加载组件的三种使用场景</h3>
    <!-- 使用场景一：直接懒加载包含<img>标签的 html 内容-->
    <!-- 组件标签 <LazyLoadImgs> 可以包裹要懒加载的<img>标签所在的容器，也可以直接包裹要加载的一个或多个 <img> 标签 -->
    <LazyLoadImgs>
      <div class="scene1-box">
        <table border="1">
          <thead>
            <tr>
              <th colspan="2" style="height: 40px">场景一（常用）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>说明</th>
              <td>
                直接懒加载包含&lt;img&gt;标签的 html 内容<br />直接将包含要懒加载的&lt;img&gt;标签及其它 html
                标签放在组件标签&lt;LazayLoadImgs&gt;内（不设置 v-model 及 v-html 指令）
              </td>
            </tr>
            <tr>
              <th class="vertical-text">实现懒加载的图片</th>
              <td>
                <img src="https://picsum.photos/200/300" />

                <div class="img-list1">
                  <img src="https://picsum.photos/300/400" />
                  <br />
                  <img src="https://picsum.photos/400/400" />
                </div>

                <div class="img-list2">
                  <img src="https://picsum.photos/300/300" />
                  <br />
                  <img src="https://picsum.photos/400/300" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LazyLoadImgs>
    <div class="separate-line"></div>
    <!-- 使用场景二：使用本组件的 v-model 指令及 html 标签如 div 的 v-html 指令渲染 html 文章内容（实现懒加载 html 中的图片），
         本组件内的 v-model 指令值必须是至少包含唯一ID属性（如 id 或其它名称）及包含 html 内容字符串的属性（如 content 或其它名称）
         的对象数组，该对象数组是响应式的。
    -->
    <div class="scene2-box">
      <div class="scene2-title">
        <div>场景二（如渲染 html 格式的文章列表）</div>
        <div>
          使用本组件的 v-model 指令及 html 标签如 div 的 v-html 指令渲染 html 文章内容（实现懒加载 html
          中的图片）， 本组件内的 v-model 指令值必须是至少包含唯一ID属性（如 id 或其它名称）及包含 html
          内容字符串的属性（如 content 或其它名称） 的对象数组，该对象数组是响应式的。
        </div>
      </div>
      <LazyLoadImgs v-model="articleList" :lazy-options="lazyOptions" html-field-name="content">
        <div v-for="article in articleList" :key="article.id" class="article-box">
          <table border="1">
            <tbody>
              <tr>
                <th>标题</th>
                <td>{{ article.title }}</td>
              </tr>
              <tr>
                <th>作者</th>
                <td>{{ article.author }}</td>
              </tr>
              <tr>
                <th>内容</th>
                <td>
                  <div :key="article.id" v-html="article.content"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LazyLoadImgs>
    </div>
    <div class="separate-line"></div>
    <!-- 使用场景三：使用本组件的 v-model 指令，及本组件包裹内的 html 标签内的 v-html 指令
         渲染一段 html 格式的内容
    -->
    <div class="scene3-box">
      <table border="1">
        <thead>
          <tr>
            <th colspan="2">场景三（只需一段 html 格式的内容）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>说明</th>
            <td>
              使用本组件的 v-model 指令，及本组件包裹内的 html 标签内的 v-html 指令 渲染一段 html 格式的内容
            </td>
          </tr>
          <tr>
            <th class="vertical-text">实现懒加载的图片</th>
            <td>
              <LazyLoadImgs v-model="htmlContent" :lazy-options="lazyOptions">
                <div v-html="htmlContent"></div>
              </LazyLoadImgs>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue-demi';

// import LazyLoadImgs from '@/components/lazy-load-imgs.vue';
import { LazyLoadImgs } from 'vue-lazyload-imgs';

import type { ILazyOptions } from '../scripts/types';

import { nanoid } from 'nanoid';

export default defineComponent({
  name: 'LazyImgs',
  components: {
    LazyLoadImgs,
  },
  setup(props, { attrs, slots, emit }) {
    const lazyRef = ref();

    const lazyOptions = ref<ILazyOptions>({
      delay: 1000,
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

    // html 格式的文章列表
    const articleList = ref([
      {
        id: nanoid(8),
        title: '文章标题1',
        content: `
        <p>
          <span style="font-weight:bold;">这是文章内容1，</span>
          <div>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，这是文章内容1，<br/>
            <img src="https://picsum.photos/200/300" />
            <div>
              <img src="https://picsum.photos/200/200" />
            </div>
          </div>
        </p>`,
        author: 'Samdy_Chan',
        createTime: '2025-02-01 23:12:56',
      },
      {
        id: nanoid(8),
        title: '文章标题2',
        content: `
        <p>
          <span style="font-weight:bold;">这是文章内容2，</span>
          <div>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，这是文章内容2，<br/>
            <img src="https://picsum.photos/300/300" />
            <div>
              <img src="https://picsum.photos/400/400" />
            </div>
          </div>
        </p>`,
        author: 'Nana Woo',
        createTime: '2025-02-03 12:31:28',
      },
      {
        id: nanoid(8),
        title: '文章标题3',
        content: `
        <p>
          <span style="font-weight:bold;">这是文章内容3，</span>
          <div>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，这是文章内容3，<br/>
            <img src="https://picsum.photos/200/200" />
            <div>
              <img src="https://picsum.photos/300/400" />
            </div>
          </div>
        </p>`,
        author: 'Chenhq',
        createTime: '2025-02-09 21:33:18',
      },
    ]);

    // 一段 html 格式的内容
    const htmlContent = ref(`
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      这是一段 html 格式的内容，这是一段 html 格式的内容，这是一段 html 格式的内容，<br/>
      <img src="https://picsum.photos/300/300" />
      <div>
        <img src="https://picsum.photos/400/400" />
      </div>
    `);

    // console.log('articleList:', articleList);

    /* onUpdated(() => {
      console.log('lazy-imgs onUpdated articleList:', articleList);
    }); */

    // setup 函数式需返回状态变量及函数等给模板渲染
    return {
      lazyRef,
      lazyOptions,
      articleList,
      htmlContent,
    };
  },
});
</script>

<style lang="scss" scoped>
$sceneBoxWidth: 100%;
$tableWidth: 800px;
$marginBottom: 50px;

.container {
  margin: 8px;
  border: 1px solid #ccc;

  .head-title {
    width: 100%;
    height: 42px;
    line-height: 42px;
    background-color: #ddd;
    text-align: center;
  }

  .scene1-box {
    width: $sceneBoxWidth;
    margin: 40px 0 $marginBottom;
  }

  .scene2-box {
    width: $sceneBoxWidth;

    .scene2-title {
      width: $tableWidth;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 120px;
      padding: 4px;
      border: 1px solid gray;
      margin: 0 auto; // 水平居中
      border-bottom: none;
      font-weight: bold;
      background-color: #f1f1f1;
    }

    .article-box {
      width: 100%;
      margin-bottom: $marginBottom;
    }
  }

  .scene3-box {
    width: $sceneBoxWidth;
    margin-bottom: $marginBottom;
  }

  .vertical-text {
    writing-mode: vertical-lr;
    letter-spacing: 6px;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto; // 表格水平居中
    width: $tableWidth;
    background-color: #f1f1f1;

    td,
    th {
      padding: 4px;
    }

    tbody th {
      width: 80px;
    }
  }

  .separate-line {
    width: 100%;
    border-top: 2px dashed gray;
    margin-bottom: $marginBottom;
  }
}
</style>
