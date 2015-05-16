global-npm
======
Require global npm as a local node module.

Npm is about 16MB in size now, which is quite a heavy dependency for most modules. Luckily, nearly every node.js/io.js user has a npm installed globally.

However, normally, you can't require a global module directly, unless:
0. set `NODE_PATH` environment variable to the folder where global modules are installed.
0. link the local project with global module.
0. require a path instead of a module name.

The last one should be the best way for a module.

If your module need to depend on `npm`, why not just use the global one?

[![NPM version](https://badge.fury.io/js/global-npm.svg)](https://www.npmjs.com/package/global-npm)
[![Deps](https://david-dm.org/dracupid/global-npm.svg?style=flat)](https://david-dm.org/dracupid/global-npm)
[![Build Status](https://travis-ci.org/dracupid/global-npm.svg)](https://travis-ci.org/dracupid/global-npm)
[![Build status](https://ci.appveyor.com/api/projects/status/github/dracupid/global-npm?svg=true)](https://ci.appveyor.com/project/dracupid/global-npm)

## Usage
```javascript
var npm = require('global-npm');
```

**If the version of npm counts, please use [semver](https://github.com/npm/node-semver) to check it by yourself.**

## License
MIT@Dracupid
