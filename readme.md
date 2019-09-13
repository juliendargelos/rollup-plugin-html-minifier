# rollup-plugin-html-minifier

This plugin minifies all files with extension `.html` in rollup bundle with [html-minifier](https://github.com/kangax/html-minifier).

## Install

```bash
yarn add rollup-plugin-html-minifier --dev
```

or

```bash
npm install rollup-plugin-html-minifier -D
```

## Usage

```javascript
// rollup.config.js

import htmlMinifier from 'rollup-plugin-html-minifier'

export default {
  // ...
  plugins: [
    htmlMinifier({
      // html-minifier options here
    })
  ]
}
```

See [html-minifier options](https://github.com/kangax/html-minifier#options-quick-reference).
