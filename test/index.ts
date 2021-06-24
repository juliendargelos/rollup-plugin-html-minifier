import { rollup, OutputBundle } from 'rollup'
import fs from 'fs-extra'
import os from 'os'
import { minify, Options } from 'html-minifier'
import html from '@rollup/plugin-html'
import htmlMinifier from '../src'

let output: string
const fixtures: string = `${__dirname}/fixtures`
const options: Options = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

const raw = [
  '<!doctype html>',
  '<html lang="en">',
  '  <head>',
  '    <meta charset="utf-8">',
  '    <title>Rollup Bundle</title>',
  '    ',
  '  </head>',
  '  <body>',
  '    <script src="index.js"></script>',
  '  </body>',
  '</html>'
].join('\n')

const minified = minify(raw, options)

const read = async (path: string) => (await fs.readFile(`${output}/${path}`))
  .toString()
  .trim()

const exists = (path: string) => fs.pathExists(`${output}/${path}`)

beforeEach(async () => {
  output = `${os.tmpdir()}/rollup-plugin-html-minifier`
  await fs.emptyDir(output)
})

afterAll(async () => {
  await fs.emptyDir(output)
})

it('minifies html', async () => {
  const bundle = await rollup({
    input: `${fixtures}/index.js`,
    plugins: [
      html({}),
      htmlMinifier({ options })
    ]
  })

  await bundle.write({
    file: `${output}/index.js`,
    format: 'iife',
    name: 'test'
  })

  expect(await exists('index.html')).toEqual(true)
  expect(await read('index.html')).toEqual(minified)
})

it('defaults to html-minifier default options', async () => {
  const bundle = await rollup({
    input: `${fixtures}/index.js`,
    plugins: [
      html({}),
      htmlMinifier()
    ]
  })

  await bundle.write({
    file: `${output}/index.js`,
    format: 'iife',
    name: 'test'
  })

  expect(await read('index.html')).toEqual(raw)
})

it('includes and excludes patterns', async () => {
  const bundle = await rollup({
    input: `${fixtures}/index.js`,
    plugins: [
      html({ fileName: 'index.html' }),
      html({ fileName: 'index.xml' }),
      html({ fileName: 'index.raw.html' }),
      html({ fileName: 'index.raw.xml' }),
      htmlMinifier({
        options,
        include: ['*.html', '*.xml'],
        exclude: ['*.raw.html', '*.raw.xml']
      })
    ]
  })

  await bundle.write({
    file: `${output}/index.js`,
    format: 'iife',
    name: 'test'
  })

  expect(await read('index.html')).toEqual(minified)
  expect(await read('index.xml')).toEqual(minified)
  expect(await read('index.raw.html')).toEqual(raw)
  expect(await read('index.raw.xml')).toEqual(raw)
})

it('filters with custom method', async () => {
  const bundle = await rollup({
    input: `${fixtures}/index.js`,
    plugins: [
      html({ fileName: 'index.min.html' }),
      html({ fileName: 'index.html' }),
      htmlMinifier({
        options,
        filter: (id: unknown) => /\.min\.html$/.test(`${id}`)
      })
    ]
  })

  await bundle.write({
    file: `${output}/index.js`,
    format: 'iife',
    name: 'test'
  })

  expect(await read('index.html')).toEqual(raw)
  expect(await read('index.min.html')).toEqual(minified)
})
