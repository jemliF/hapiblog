const Authors = require('../models/Author')
const Articles = require('../models/Article')
const AUTHOR = 'author', ARTICLE = 'article'
let rethinkdb = {}

rethinkdb.add = (model, document) => {
    console.log(document)
    console.log(model)
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors

    let doc = new Authors({
        firstname: document.firstname,
        lastname: document.lastname,
        email: document.email,
        password: document.password
    })

    return doc.save({conflict: 'replace'})
}

rethinkdb.getAll = (model) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    return Model.orderBy('')
}

rethinkdb.get = (model, id) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    return Model.get(id)
}

rethinkdb.getByEmailAndPassword = (email, password) => {
    return Authors.filter({email: email, password: password})
}

rethinkdb.delete = (model, id) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    return rethinkdb.get(model, id).then((document) => {
        return document.delete()
    }, (err) => {
        return err
    })
}

rethinkdb.update = (model, id, document, next) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    rethinkdb.get(model, id).then((document) => {
        return rethinkdb.add(model, document)
    }, (err) => {
        return err
    })
}

module.exports = rethinkdb