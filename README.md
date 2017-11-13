# context-link

> 📖 link contextual based text entries

[![Build Status](https://travis-ci.org/gabrielcsapo/context-link.svg?branch=master)](https://travis-ci.org/gabrielcsapo/context-link)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/context-link/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/context-link)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/context-link/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/context-link#info=devDependencies)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/context-link.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/context-link)
[![npm](https://img.shields.io/npm/dt/context-link.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/context-link.svg?maxAge=2592000)]()

## Installation

```
npm install --save context-link
```

## Usage

```javascript
var context = new ContextLink([
  'hello world',
  'hello saturn',
  'hello pluto'
]);
var found = context.find('hello');
```

> UMD bundle located in ./dist
