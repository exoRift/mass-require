const fs = require('fs')
const path = require('path')

const {
  extRegex
} = require('../constants.js')

/**
 * Mass require a directory into an object where the key is the filename
 * @param   {String}  dir                            The directory to mass require
 * @param   {Object}  [options={}]                   The options for the require
 * @prop    {Boolean} [options.recursive=false]      Whether subfolders are included or not
 * @prop    {Boolean} [options.flatten=false]        Normally, subfolder files will be placed in a property named after the subfolder, setting this to true will put all subfiles in the root object
 * @prop    {Boolean} [options.removeExtension=true] Whether the extensions of file names are removed from the property names or not
 * @prop    {RegExp}  [options.exclude]              A regex pattern to indicate a file should be skipped
 * @returns {Object}
 */
function toObject (dir, options = {}) {
  const {
    recursive = false,
    flatten = false,
    removeExtension = true,
    exclude
  } = options

  const content = {}

  const files = fs.readdirSync(dir)

  for (const filename of files) {
    const conjunction = path.join(dir, filename)

    if (exclude && filename.match(exclude)) continue

    if (fs.lstatSync(conjunction).isDirectory()) {
      if (recursive) {
        if (flatten) Object.assign(content, toObject(conjunction, options))
        else content[filename] = toObject(conjunction, options)
      }
    } else if (removeExtension) {
      const extension = filename.match(extRegex)

      content[filename.substring(0, extension.index)] = require(conjunction)
    } else content[filename] = require(conjunction)
  }

  return content
}

module.exports = toObject
