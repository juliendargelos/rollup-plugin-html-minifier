import { minify } from 'html-minifier';
import { createFilter } from '@rollup/pluginutils';

var index = ({ include = '*.html', exclude = undefined, filter = createFilter(include, exclude), options = {} } = {}) => ({
    name: 'html-minifier',
    generateBundle(outputOptions, bundle) {
        Object.values(bundle).forEach((file) => {
            if (file.type !== 'asset' || !filter(file.fileName))
                return;
            file.source = minify(file.source.toString(), options);
        });
    }
});

export default index;
