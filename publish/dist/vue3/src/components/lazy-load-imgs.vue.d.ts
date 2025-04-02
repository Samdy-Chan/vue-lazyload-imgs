import { PropType } from 'vue-demi';
import { ILazyOptions } from '../scripts/types';
declare const _default: import('vue-demi').DefineComponent<import('vue-demi').ExtractPropTypes<{
    [x: string]: {
        type: PropType<string | object[]>;
        required: false;
        default?: undefined;
    } | {
        type: PropType<ILazyOptions>;
        required: false;
        default: () => any;
    } | {
        type: PropType<IntersectionObserverInit>;
        required: false;
        default: () => any;
    };
    lazyOptions: {
        type: PropType<ILazyOptions>;
        required: false;
        default: () => any;
    };
    observerOptions: {
        type: PropType<IntersectionObserverInit>;
        required: false;
        default: () => any;
    };
    htmlFieldName: {
        type: PropType<string>;
        required: false;
    };
}>, {
    instId: number;
}, {}, {}, {}, import('vue-demi').ComponentOptionsMixin, import('vue-demi').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue-demi').PublicProps, Readonly<import('vue-demi').ExtractPropTypes<{
    [x: string]: {
        type: PropType<string | object[]>;
        required: false;
        default?: undefined;
    } | {
        type: PropType<ILazyOptions>;
        required: false;
        default: () => any;
    } | {
        type: PropType<IntersectionObserverInit>;
        required: false;
        default: () => any;
    };
    lazyOptions: {
        type: PropType<ILazyOptions>;
        required: false;
        default: () => any;
    };
    observerOptions: {
        type: PropType<IntersectionObserverInit>;
        required: false;
        default: () => any;
    };
    htmlFieldName: {
        type: PropType<string>;
        required: false;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue-demi').ComponentProvideOptions, true, {}, any>;
export default _default;
