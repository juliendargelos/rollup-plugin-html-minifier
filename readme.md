# rollup-plugin-html-minifier

This plugin minifies html files in rollup bundle with [html-minifier](https://github.com/kangax/html-minifier).

## Install

```bash
yarn add rollup-plugin-html-minifier --dev
```

or

```bash
npm install rollup-plugin-html-minifier -D
```

## Usage

rollup.config.js

```javascript
import htmlMinifier from 'rollup-plugin-html-minifier'

export default {
  // ...
  plugins: [
    htmlMinifier({
      // These are the default values:

      // Glob pattern or array of glob patterns to include
      include: '*.html',

      // Glob pattern or array of glob patterns to exclude
      exclude: undefined,

      // Method returning a boolean that filters files to process
      // given their name (overrides include and exclude parameters)
      filter: undefined, 

      // html-minifier options
      options: {}
    })
  ]
}
```

Most of the html-minifier options are disabled by default. You need to set some of them to get an actual minification. See [html-minifier options](https://github.com/kangax/html-minifier#options-quick-reference).
