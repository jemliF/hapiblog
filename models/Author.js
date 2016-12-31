const thinky = require('../data/rethinkdb/index')

var Author = thinky.createModel('author', {
    firstname: String,
    lastname: String,
    email: thinky.type.string().email(),
    password: String
})

module.exports = Author