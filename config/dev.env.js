var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  __WEBPACK_CLIENT_ID__: '"b39ix7rp2i5l426ng0h2lij4cfz9htk"',
  __REDIRECT_URI__: '"http://localhost/"'
})
