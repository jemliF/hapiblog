const thinky = require('../data/rethinkdb/index')

var Author = thinky.createModel('Author', {
    firstname: String,
    lastname: String,
    email: thinky.type.string().email(),
    password: String
})