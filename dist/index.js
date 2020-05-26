'use strict';

var htmlMinifier = require('html-minifier');

var index = (options = {}) => ({
    name: 'html-minifier',
    generateBundle(outputOptions, bundle) {
        Object.values(bundle).forEach((file) => {
            if (file.type !== 'asset' || file.fileName.slice(-5) !== '.html')
                return;
            file.source = htmlMinifier.minify(file.source.toString(), options);
        });
    }
});

module.exports = index;
