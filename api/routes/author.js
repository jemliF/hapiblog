const author = require('../handlers/author')
const article = require('../handlers/article')

exports.getAll = {
    method: 'GET',
    path: '/api/v1/authors/{id?}',
    config: {
        description: 'Returns all authors or the author having this id',
        tags: ['blog', 'author', 'editor'],
        notes: 'id parameter is optional'
    },
    handler: author.getAll
}

exports.save = {
    method: 'POST',
    path: '/api/v1/authors',
    config: {
        description: 'Saves an author',
        tags: ['blog', 'author', 'editor'],
        notes: 'the request body must contain the author object'
    },
    handler: author.save
}