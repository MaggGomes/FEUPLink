'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_ENV: JSON.stringify(process.env.API_ENV || 'staging')
}
