import { minify } from 'html-minifier';

var index = (options = {}) => ({
    name: 'html-minifier',
    generateBundle(outputOptions, bundle) {
        Object.values(bundle).forEach((file) => {
            if (file.type !== 'asset' || file.fileName.slice(-5) !== '.html')
                return;
            file.source = minify(file.source.toString(), options);
        });
    }
});

export default index;
