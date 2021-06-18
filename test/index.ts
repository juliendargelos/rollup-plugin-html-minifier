import { rollup, OutputBundle } from 'rollup'
import fs from 'fs-extra'
import os from 'os'
import html from '@rollup/plugin-html'
import htmlMinifier from '../src'

const fixtures: string = `${__dirname}/fixtures`
let output: string

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
      htmlMinifier({
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      })
    ]
  })

  await bundle.write({
    file: `${output}/index.js`,
    format: 'iife',
    name: 'test'
  })

  expect(await fs.pathExists(`${output}/index.html`)).toEqual(true)
  expect(await fs.pathExists(`${output}/page`)).toEqual(false)
  expect((await fs.readFile(`${output}/index.html`)).toString().trim()).toEqual(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Rollup Bundle</title></head><body><script src="index.js"></script></body></html>'
  )
})
