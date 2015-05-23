"use strict";
var fs = require('fs'),
    path = require('path'),
    which = require('which');

var GLOBAL_NPM_BIN, GLOBAL_NPM_PATH;

function throwNotFoundError() {
    var err = new Error("Cannot find module 'npm'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
}

try {
    GLOBAL_NPM_BIN = fs.realpathSync(which.sync('npm'));
}
catch (e) {
    throwNotFoundError();
}

GLOBAL_NPM_PATH = path.join(GLOBAL_NPM_BIN, process.platform === "win32" ? '../node_modules/npm' : '../..');

module.exports = (function (npmPath) {
    try {
        var npm = require(npmPath);
        return npm;
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
        throwNotFoundError();
    }
})(GLOBAL_NPM_PATH);
module.exports.GLOBAL_NPM_PATH = GLOBAL_NPM_PATH;
module.exports.GLOBAL_NPM_BIN = GLOBAL_NPM_BIN;
