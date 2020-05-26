import { minify, Options } from 'html-minifier'
import { OutputOptions, OutputBundle, Plugin } from 'rollup'

export default (options: Options = {}): Plugin => ({
  name: 'html-minifier',

  generateBundle(outputOptions: OutputOptions, bundle: OutputBundle) {
    Object.values(bundle).forEach((file) => {
      if (file.type !== 'asset' || file.fileName.slice(-5) !== '.html') return
      file.source = minify(file.source.toString(), options)
    })
  }
})
