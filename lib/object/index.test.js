import test from 'ava'
import path from 'path'

import toObject from './'

test.before((t) => {
  t.context.require = (options) => toObject(path.join(process.cwd(), 'test'), options)
})

test('defaults', (t) => {
  const results = t.context.require()

  t.deepEqual(results, {
    fileone: 'one',
    filetwo: {
      test: 'two'
    }
  })
})

test('recursion', (t) => {
  const results = t.context.require({
    recursive: true
  })

  t.deepEqual(results, {
    fileone: 'one',
    filetwo: {
      test: 'two'
    },
    subfolder: {
      'subfolder-file': 'subfolder file'
    }
  })
})

test('keepExtension', (t) => {
  const results = t.context.require({
    recursive: true,
    removeExtension: false
  })

  t.deepEqual(results, {
    'fileone.js': 'one',
    'filetwo.json': {
      test: 'two'
    },
    subfolder: {
      'subfolder-file.js': 'subfolder file'
    }
  })
})

test('flattening', (t) => {
  const results = t.context.require({
    recursive: true,
    flatten: true
  })

  t.deepEqual(results, {
    fileone: 'one',
    filetwo: {
      test: 'two'
    },
    'subfolder-file': 'subfolder file'
  })
})

test('excludePatterns', (t) => {
  const results = t.context.require({
    exclude: /\.js$/
  })

  t.deepEqual(results, {
    filetwo: {
      test: 'two'
    }
  })
})
