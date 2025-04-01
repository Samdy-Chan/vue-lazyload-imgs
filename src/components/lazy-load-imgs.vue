<template>
  <div class="lazyload-all-box">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  isVue2,
  isVue3,
  type PropType,
  type VNode,
  getCurrentInstance,
  useSlots,
  version as vueVersion,
} from 'vue-demi';

import { lazyOptionsObj, observerOptionsObj } from '@/scripts/lazy-observer-options';

import { EImgCustAttr, EmitFunc, ILazyOptions } from '@/scripts/types';

import { Lazy } from '@/scripts/lazy.class';

import { deepCopy, waitLoadingImg } from '@/scripts/utils';

export default defineComponent({
  name: 'LazyLoadImgs',

  props: {
    [isVue2 ? 'value' : 'modelValue']: {
      type: [String, Array] as PropType<string | object[]>,
      required: false,
    },

    lazyOptions: {
      type: Object as PropType<ILazyOptions>,
      required: false,
      default: () => deepCopy(lazyOptionsObj),
    },

    observerOptions: {
      type: Object as PropType<IntersectionObserverInit>,
      required: false,
      default: () => deepCopy(observerOptionsObj),
    },

    htmlFieldName: {
      type: String as PropType<string>,
      required: false,
    },
  },

  emits: isVue2 ? [] : ['update:modelValue'],

  setup(props, { emit, attrs }) {
    const lazyOptions: ILazyOptions = Object.assign({}, lazyOptionsObj, props.lazyOptions);
    const observerOptions: IntersectionObserverInit = Object.assign(
      {},
      observerOptionsObj,
      props.observerOptions
    );

    let dataImgIdList: string[] = [];

    // @ts-ignore 以上定义了动态 props.modelValue，所以这里 props.htmlFieldName 会报类型错误，可能是 vscode 或 ts 版本问题导致，忽略该类型报错即可，不影响运行
    const lazy = new Lazy(lazyOptions, observerOptions, props.htmlFieldName);

    let instId = Lazy.instId;

    const app = getCurrentInstance();

    let imgObserver: IntersectionObserver;

    const getDefaultSlotVnodes = () => {
      let defaultSlotVnodes: VNode[] = [];

      if (vueVersion.startsWith('2.6')) {
        // @ts-ignore
        let slots = app?.slots;
        defaultSlotVnodes = slots?.default as any;
      } else {
        let slots = useSlots();
        defaultSlotVnodes = slots!.default?.()!;
      }

      return defaultSlotVnodes;
    };

    onBeforeMount(() => {
      const defaultSlotVnodes: VNode[] = getDefaultSlotVnodes();
      console.log('default slot vnodes:', defaultSlotVnodes);

      const modelData = isVue2 ? props.value : props.modelValue;

      // @ts-ignore 以上定义了动态 props.modelValue，所以这里 modelData 会报类型错误，可能是 vscode 或 ts 版本问题导致，忽略该类型报错即可，不影响运行
      dataImgIdList = lazy.setImgSrcToLoadingImg(defaultSlotVnodes, modelData, emit as EmitFunc);
    });

    onMounted(async () => {
      imgObserver = lazy.createImgObserver();

      const allImgs = document.querySelectorAll(`img[${EImgCustAttr.IMG_ID}^=inst${instId}-]`);

      const { img, err } = await waitLoadingImg(lazyOptions.loadingImg!, instId).catch((err) => err);

      Array.prototype.forEach.call(allImgs, (imgEl: HTMLImageElement) => imgObserver.observe(imgEl));
    });

    onBeforeUpdate(() => {});

    onUpdated(() => {});

    onBeforeUnmount(() => {
      const delayImgs = document.querySelectorAll(
        `img[${EImgCustAttr.IMG_ID}^=inst${instId}-][${EImgCustAttr.TIMEOUT_ID}]`
      );
      Array.prototype.forEach.call(delayImgs, (imgEl: HTMLImageElement) => lazy.clearLazyTimeout(imgEl));
    });

    onUnmounted(() => {
      Lazy.instId--;

      imgObserver.disconnect();
    });

    return {
      instId,
    };
  },
});
</script>

<style lang="scss" scoped></style>
