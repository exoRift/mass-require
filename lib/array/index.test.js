import test from 'ava'
import path from 'path'

import toArray from './'

test.before((t) => {
  t.context.require = (options) => toArray(path.join(process.cwd(), 'test'), options)
})

test('defaults', (t) => {
  const results = t.context.require()

  t.deepEqual(results, [
    'one',
    {
      test: 'two'
    }
  ])
})

test('recursion', (t) => {
  const results = t.context.require({
    recursive: true
  })

  t.deepEqual(results, [
    'one',
    {
      test: 'two'
    },
    [
      'subfolder file'
    ]
  ])
})

test('flattening', (t) => {
  const results = t.context.require({
    recursive: true,
    flatten: true
  })

  t.deepEqual(results, [
    'one',
    {
      test: 'two'
    },
    'subfolder file'
  ])
})

test('excludePatterns', (t) => {
  const results = t.context.require({
    exclude: /\.js$/
  })

  t.deepEqual(results, [
    {
      test: 'two'
    }
  ])
})
