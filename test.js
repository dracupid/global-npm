var npm = require('./')
var assert = require('assert')

console.log('path:    ', npm.GLOBAL_NPM_PATH)
console.log('bin:     ', npm.GLOBAL_NPM_BIN)
console.log('version: ', npm.version)
assert.equal(typeof npm.version, 'string')
