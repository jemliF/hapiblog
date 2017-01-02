const author = require('../handlers/author')
const article = require('../handlers/article')

exports.get = {
    method: 'GET',
    path: '/api/v1/authors/{id?}',
    config: {
        description: 'Returns all authors or the author having this id',
        tags: ['blog', 'author', 'editor'],
        notes: 'id parameter is optional'
    },
    handler: author.get
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
exports.update = {
    method: 'PUT',
    path: '/api/v1/authors/{id}',
    config: {
        description: 'Updates an author',
        tags: ['blog', 'author', 'editor'],
        notes: 'the request body must contain the author object and the request params must contain the author id'
    },
    handler: author.update
}

exports.delete = {
    method: 'DELETE',
    path: '/api/v1/authors/{id}',
    config: {
        description: 'Deletes an author',
        tags: ['blog', 'author', 'editor'],
        notes: 'the request params must contain the author id'
    },
    handler: author.delete
}