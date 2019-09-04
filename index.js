'use strict'

var fs = require('fs')
var path = require('path')
var which = require('which')

var GLOBAL_NPM_BIN
var GLOBAL_NPM_PATH

var throwNotFoundError = function () {
  var err = new Error("Cannot find module 'npm'")
  err.code = 'MODULE_NOT_FOUND'
  throw err
}

try {
  var ENV = process.env
  if (ENV.GLOBAL_NPM_BIN) {
    GLOBAL_NPM_BIN = ENV.GLOBAL_NPM_BIN
  } else if (ENV.npm_execpath) {
    GLOBAL_NPM_BIN = ENV.npm_execpath
  } else if ((ENV.NODENV_VERSION === 'system') && ENV.NODENV_ROOT) {
    var trimPath = ENV.PATH.replace(path.join(ENV.NODENV_ROOT, 'shims'), '')
    GLOBAL_NPM_BIN = fs.realpathSync(which.sync('npm', { path: trimPath }))
  } else {
    GLOBAL_NPM_BIN = fs.realpathSync(which.sync('npm'))
  }
} catch (e) {
  throwNotFoundError()
}

GLOBAL_NPM_PATH = process.env.GLOBAL_NPM_PATH || path.join(
  GLOBAL_NPM_BIN,
  process.platform === 'win32' ? '../node_modules/npm' : '../..'
)

module.exports = (function () {
  try {
    var npm = require(GLOBAL_NPM_PATH)
    if (npm && Object.keys(npm).length) {
      return npm
    }
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e
    }
  }
  throwNotFoundError()
})()

module.exports.GLOBAL_NPM_PATH = GLOBAL_NPM_PATH
module.exports.GLOBAL_NPM_BIN = GLOBAL_NPM_BIN
