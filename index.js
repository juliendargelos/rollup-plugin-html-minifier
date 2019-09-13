"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_minifier_1 = require("html-minifier");
exports.default = (options = {}) => ({
    name: 'html-minifier',
    generateBundle(outputOptions, bundle) {
        Object.values(bundle).forEach((file) => {
            if (file.type !== 'asset' || file.fileName.slice(-5) !== '.html')
                return;
            file.source = html_minifier_1.minify(file.source.toString(), options);
        });
    }
});
