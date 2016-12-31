const Authors = require('../models/Author')
const Articles = require('../models/Article')
const AUTHOR = 'author', ARTICLE = 'article'
let rethinkdb = {}

rethinkdb.add = (model, document) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors

    //let doc = new Model(document)
    console.log(document)
    //return Model.save([document])
    Authors.save(document).then((resp) => {
        console.log(resp)
    }, (err) => {
        console.error(err)
    })
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

rethinkdb.delete = (model, id) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    rethinkdb.get(model, id).then((document) => {
        return document.delete()
    }, (err) => {
        return err
    })
}

rethinkdb.update = (model, id, document) => {
    let Model = null
    model === ARTICLE ? Model = Articles : Model = Authors
    rethinkdb.get(model, id).then((document) => {
        return rethinkdb.add(model, document)
    }, (err) => {
        return err
    })
}

module.exports = rethinkdb