import { Options } from 'html-minifier';
import { Plugin } from 'rollup';
declare const _default: ({ include, exclude, filter, options }?: {
    include?: string | string[] | undefined;
    exclude?: string | string[] | undefined;
    filter?: ((id: string | unknown) => boolean) | undefined;
    options?: Options | undefined;
}) => Plugin;
export { _default as default };
