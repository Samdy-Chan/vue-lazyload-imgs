import { PropType } from 'vue-demi';
import { ILazyOptions } from '../scripts/types';
declare const _default: import('vue/types/v3-define-component').DefineComponent<{
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
}, {
    instId: number;
}, import('vue-demi').Data, {}, {}, import('vue/types/v3-component-options').ComponentOptionsMixin, import('vue/types/v3-component-options').ComponentOptionsMixin, "update:modelValue"[], string, Readonly<import('vue-demi').ExtractPropTypes<{
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
}>>, {}>;
export default _default;
