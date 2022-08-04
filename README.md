# Mass Require

[![Quality Assurance](https://github.com/exoRift/mass-require/workflows/Quality%20Assurance/badge.svg)](https://github.com/exoRift/cyclone-engine/actions?query=workflow%3A%22Quality+Assurance%22)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d28e147b51ea7a31ed70/test_coverage)](https://codeclimate.com/github/exoRift/mass-require/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d28e147b51ea7a31ed70/maintainability)](https://codeclimate.com/github/exoRift/mass-require/maintainability)

[![Version](https://img.shields.io/github/package-json/v/exoRift/mass-require.svg?label=Version)](#)
[![NPM Downloads](https://img.shields.io/npm/dt/mass-require?label=Downloads&logo=npm)](#)

[![NPM Page](https://img.shields.io/badge/NPM-Page-critical?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/mass-require)
[![Gitter](https://img.shields.io/badge/CHAT%20WITH%20US-GITTER-f68d42?style=for-the-badge&logo=gitter)](https://gitter.im/exoRift/mass-require)

Usage
-
Mass require is a package meant for modular packages. It's able to require iterative content in a fast and simple format with configurable settings

Examples for usage
-
- Commands for a Discord bot

  *If your bot's commands are in separate files in a folder, you would be able to require them all using mass require*
- JSON data storage

  *If using JSON to store data for separate entities in different files, you would be able to require it all in a format that would be easy to handle and manipulate*

Best Practice
-
The best practice for using mass require would be to have an `index.js` file in a folder with code along the lines of

```js
const {
  toObject
} = require('mass-require')

module.exports = toObject(__dirname, {
  exclude: /^index\.js$/ // Don't require the file that is mass requiring or else your code will break
})
```

Formats
-
When importing the library into your code, you will be presented with an object containing two functions.

> toArray

This will require all the specified files and insert their values into an array. If recursion is enabled, all values from a subfolder will be put in an array entry (that is inside the root array). Meaning, your array would look like this:
```js
['foo', ['bar', 'baz']]
```

> toObject

This will require all the specified files and insert their values into an object where the key pertains to the name of the file. The files of a subfolder will be under a property named after the subfolder's name. (If removeExtension is `true`, it will be the name of the file without its extension)

Options
-
Configure import properties by specifying an object as the second parameter for both functions (The first being the directory)

Name|Type|Description|Default
-|-|-|-
`recursive`|`Boolean`|Whether subfolder files should be required|false
`flatten`|`Boolean`|If recursive, whether subfolder files should be placed in the root structure rather than a nested one|false
`removeExtension` (`toObject` only)|`Boolean`|Whether file extensions should be removed from the property name|true
`exclude`|`RegExp`|A Regex pattern to exclude files from being required
