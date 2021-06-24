'use strict';

var htmlMinifier = require('html-minifier');
var pluginutils = require('@rollup/pluginutils');

var index = ({ include = '*.html', exclude = undefined, filter = pluginutils.createFilter(include, exclude), options = {} } = {}) => ({
    name: 'html-minifier',
    generateBundle(outputOptions, bundle) {
        Object.values(bundle).forEach((file) => {
            if (file.type !== 'asset' || !filter(file.fileName))
                return;
            file.source = htmlMinifier.minify(file.source.toString(), options);
        });
    }
});

module.exports = index;
