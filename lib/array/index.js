const fs = require('fs')
const path = require('path')

/**
 * Mass require a directory into an array
 * @param   {String}  dir                            The directory to mass require
 * @param   {Object}  [options={}]                   The options for the require
 * @prop    {Boolean} [options.recursive=false]      Whether subfolders are included or not
 * @prop    {Boolean} [options.flatten=false]        Normally, subfolder files will be placed in a nested array, setting this to true will put all subfiles in the root array
 * @prop    {RegExp}  [options.exclude]              A regex pattern to indicate a file should be skipped
 * @returns {Array}
 */
function toArray (dir, options = {}) {
  const {
    recursive = false,
    flatten = false,
    exclude
  } = options

  const content = []

  const files = fs.readdirSync(dir)

  for (const filename of files) {
    const conjunction = path.join(dir, filename)

    if (exclude && filename.match(exclude)) continue

    if (fs.lstatSync(conjunction).isDirectory()) {
      if (recursive) {
        if (flatten) {
          const subcontent = toArray(conjunction, options)

          for (const subvalue of subcontent) content.push(subvalue)
        } else content.push(toArray(conjunction, options))
      }
    } else content.push(require(conjunction))
  }

  return content
}

module.exports = toArray
