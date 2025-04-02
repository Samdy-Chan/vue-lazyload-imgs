import { PropType } from 'vue-demi';
import { ILazyOptions } from '../scripts/types';
declare const _default: import('vue').ComponentOptions<import('vue').default, import('vue-demi').ShallowUnwrapRef<{
    instId: number;
}> & import('vue-demi').Data, {}, {}, {
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
}, import('vue-demi').ExtractPropTypes<{
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
}>> & Omit<import('vue').VueConstructor<import('vue').default>, never> & (new (...args: any[]) => import('vue-demi').ComponentRenderProxy<{} & {
    [x: string]: string | ILazyOptions | IntersectionObserverInit | object[] | undefined;
    [x: number]: string | ILazyOptions | IntersectionObserverInit | object[] | undefined;
} & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, import('vue-demi').ShallowUnwrapRef<{
    instId: number;
}>, import('vue-demi').Data, {}, {}, {}, {}, string[], {} & {
    [x: string]: string | ILazyOptions | IntersectionObserverInit | object[] | undefined;
    [x: number]: string | ILazyOptions | IntersectionObserverInit | object[] | undefined;
} & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {}, true>);
export default _default;
