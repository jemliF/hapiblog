const thinky = require('../data/rethinkdb/index')

let Article = thinky.createModel('Article', {
    title: String,
    content: String,
    createdAt: {
        _type: Date,
        default: thinky.r.now()
    },
    tags: [String]
});