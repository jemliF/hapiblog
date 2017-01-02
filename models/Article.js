const thinky = require('../data/rethinkdb/index').thinky
const Author = require('./Author')
let Article = thinky.createModel('article', {
    title: String,
    content: String,
    createdAt: {
        _type: Date,
        default: thinky.r.now()
    },
    tags: [String],
    authorId: String
})

Article.belongsTo(Author, 'author', 'authorId', 'id')

module.exports = Article