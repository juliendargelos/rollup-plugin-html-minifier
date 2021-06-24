import { minify, Options } from 'html-minifier'
import { OutputOptions, OutputBundle, Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'

export default ({
  include = '*.html',
  exclude = undefined,
  filter = createFilter(include, exclude),
  options = {}
}: {
  include?: string | string[]
  exclude?: string | string[]
  filter?: (id: string | unknown) => boolean
  options?: Options
} = {}): Plugin => ({
  name: 'html-minifier',

  generateBundle(outputOptions: OutputOptions, bundle: OutputBundle) {
    Object.values(bundle).forEach((file) => {
      if (file.type !== 'asset' || !filter(file.fileName)) return
      file.source = minify(file.source.toString(), options)
    })
  }
})
