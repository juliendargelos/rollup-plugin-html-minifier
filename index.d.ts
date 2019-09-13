import { Options } from 'html-minifier';
import { OutputOptions, OutputBundle } from 'rollup';
declare const _default: (options?: Options) => {
    name: string;
    generateBundle(outputOptions: OutputOptions, bundle: OutputBundle): void;
};
export default _default;
