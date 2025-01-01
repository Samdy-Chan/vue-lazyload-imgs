<template>
  <div>
    <LazyLoadImgs ref="lazyRef" v-model="imgList" @chgImgList="chgImgList" :lazy-options="lazyOptions">
      <img src="https://picsum.photos/200/300" />

      <div class="img-list1">
        <button @click="chgLazyOptions">换Options</button>
        <!-- <img src="https://img.soogif.com/B84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg" /> -->
      </div>

      <div class="img-list2">
        <img src="https://picsum.photos/300/300" />
        <br />
        <img src="https://picsum.photos/400/300" />
      </div>

      <!-- 组件懒加载 v-html 指令内的 img 标签图片 -->
      <button @click="appendImgs">追加图片</button>
      <div class="img-list3" v-for="{ key, htmlStr } in imgList" :key="key" v-html="htmlStr"></div>
    </LazyLoadImgs>

    <LazyLoadImgs ref="lazyRef2" :lazy-options="lazyOptions">
      <img src="https://picsum.photos/500/300" />
    </LazyLoadImgs>

    <LazyLoadImgs ref="lazyRef3" :lazy-options="lazyOptions" v-if="showLazy">
      <img src="https://picsum.photos/500/300err" />
      <button @click="showLazyHandler">显示/隐藏</button>
    </LazyLoadImgs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue-demi';

// import LazyLoadImgs from '@/components/lazy-load-imgs.vue';
import { LazyLoadImgs } from '@samdy-chan/vue-lazyload-imgs';

import type { ILazyOptions } from '../scripts/types';

import { nanoid } from 'nanoid';

export default defineComponent({
  name: 'LazyImgs',
  components: {
    LazyLoadImgs,
  },
  setup(props, { attrs, slots, emit }) {
    const lazyRef = ref();
    const lazyRef2 = ref();
    const lazyRef3 = ref();

    const showLazy = ref(true);

    const htmlStr = ref(`
    <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />
    <div class="img-list4" style="border:1px solid red;">
        <img src="https://picsum.photos/300/300err">
        <div class="img-list4-2">
            <img src="https://picsum.photos/300/300">
        </div>
    </div>
`);

    const imgList = ref<any>([
      {
        key: nanoid(8),
        htmlStr: '<img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />',
      },
      {
        key: nanoid(8),
        htmlStr: `
        <div class="img-list4" style="border:1px solid red;">
            <img src="https://picsum.photos/300/300err">
            <div class="img-list4-2">
                <img src="https://picsum.photos/300/300">
            </div>
        </div>`,
      },

      /* '<img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />',
    `<div class="img-list4" style="border:1px solid red;">
        <img src="https://picsum.photos/300/300err">
        <div class="img-list4-2">
            <img src="https://picsum.photos/300/300">
        </div>
    </div>` */
    ]);

    function appendImgs() {
      const imgs = [
        {
          key: Date.now() + Math.floor(Math.random() * (999 - 100 + 1)) + 100,
          htmlStr: '<img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />',
        },
        {
          key: Date.now() + Math.floor(Math.random() * (999 - 100 + 1)) + 100,
          htmlStr: `
        <div class="img-list4" style="border:1px solid red;">
            <img src="https://picsum.photos/300/300err">
            <div class="img-list4-2">
                <img src="https://picsum.photos/300/300">
            </div>
        </div>`,
        },
      ];

      // 添加图片到数组首部有问题：原来显示的图片失效不显示了，img.src 被修改
      imgList.value.unshift(...imgs);

      lazyOptions.value = {
        loadingImg: 'http://baidu.com/a.jpg',
        lifeFunc: {
          loading: () => console.log('加载中...'),
          loaded: () => console.log('加载完成'),
          error: () => console.log('加载错误'),
        },
        delay: 1000,
      };
    }

    function showLazyHandler() {
      showLazy.value = !showLazy.value;
    }

    const lazyOptions = ref<ILazyOptions>({
      loadingImg: 'https://img.soogif.com/B84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg',
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

    function chgLazyOptions() {
      lazyOptions.value.loadingImg = 'https://picsum.photos/400/300';
      console.log(lazyOptions.value);
    }

    function chgImgList(newImgList: { key: string; htmlStr: string }[]) {
      // this.imgList = [...newImgList];  // vue2 反而不用再执行 v-model 的梆定变量重新渲染了
      console.log('newImgList:', imgList.value);
    }

    onBeforeUpdate(() => {
      console.log('parent onBeforeUpdate');
    });

    onUpdated(() => {
      // console.log('parent onUpdated');
    });

    onMounted(() => {
      const imgList3 = document.querySelector('.img-list3');
      console.log('parent onMounted imgList3:', imgList3);
      // console.log('lazyRef:', lazyRef, 'instId:', lazyRef.value.instId);
      // console.log('lazyRef2:', lazyRef2, 'instId:', lazyRef2.value.instId);
      // console.log('lazyRef3:', lazyRef3, 'instId:', lazyRef3.value.instId);
    });

    // setup 函数式需返回状态变量及函数等给模板渲染
    return {
      lazyOptions,
      imgList,
      htmlStr,
      showLazy,
      chgLazyOptions,
      appendImgs,
      showLazyHandler,
      chgImgList,
      lazyRef,
      lazyRef2,
      lazyRef3,
    };
  },
});
</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
