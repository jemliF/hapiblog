'use strict'

let thinky = require('thinky')({
    host: process.env.RETHINKDB_HOST,
    port: process.env.RETHINKDB_PORT,
    db: process.env.RETHINKDB_DB
})

module.exports = thinky