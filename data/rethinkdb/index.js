'use strict'
const log = require('../../utils/log')

let thinky = require('thinky')({
    host: process.env.RETHINKDB_HOST,
    port: process.env.RETHINKDB_PORT,
    db: process.env.RETHINKDB_DB
})

exports.check = () => {
    return thinky.dbReady()
}

exports.thinky = thinky