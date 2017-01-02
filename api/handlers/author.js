const elasticsearch = require('../../services/elasticsearch')
const rethinkdb = require('../../services/rethinkdb')
const log = require('../../utils/log')
const Boom = require('boom')
const Validation = require('../../utils/validation')
const Joi = require('joi')
const AUTHOR = 'author', ARTICLE = 'article'

exports.get = (req, rep) => {
    log.main.debug('[GET]   /api/v1/authors/' + (req.params.id || ''))
    if (req.params.id) {
        rethinkdb.get(AUTHOR, req.params.id).then((document) => {
            rep(document)
        }, (err) => {
            log.rethinkDB.error(err)
            rep(Boom.notFound(err))
        })
    } else {
        rethinkdb.getAll(AUTHOR).then((documents) => {
            rep(documents)
        }, (err) => {
            log.rethinkDB.error(err)
            rep(Boom.notFound(err))
        })
    }
}

exports.save = (req, rep) => {
    log.main.debug('[POST]  /api/v1/authors/')
    //console.log(req.payload)
    Joi.validate(req.payload, Validation.Author, (err, value) => {
        if (err) {
            log.main.error(err)
            rep(Boom.badData(err))
        } else {
            //console.log(value)
            rethinkdb.add(AUTHOR, req.payload).then((resp) => {
                console.log(resp)
                elasticsearch.add(AUTHOR, resp, (err, res) => {
                    if (err) {
                        log.elasticsearch.error(err)
                        rep(Boom.badImplementation(err))
                    } else {
                        console.log(res)
                        rep(resp)
                    }
                })
            }, (err) => {
                log.rethinkDB.error(err)
                rep(Boom.badImplementation(err))
            })
        }
    })
}

exports.update = (req, rep) => {
    log.main.debug('[PUT]  /api/v1/authors/')
    //console.log(req.payload)
    Joi.validate(req.payload, Validation.Author, (err, value) => {
        if (err) {
            log.main.error(err)
            rep(Boom.badData(err))
        } else {
            //console.log(value)
            rethinkdb.update(AUTHOR, req.params.id, req.payload).then((resp) => {
                console.log(resp)
                elasticsearch.update(AUTHOR, resp, (err, res) => {
                    if (err) {
                        log.elasticsearch.error(err)
                        rep(Boom.badImplementation(err))
                    } else {
                        console.log(res)
                        rep(resp)
                    }
                })
            }, (err) => {
                log.rethinkDB.error(err)
                rep(Boom.badImplementation(err))
            })
        }
    })
}

exports.delete = (req, rep) => {
    log.main.debug('[DELETE]  /api/v1/authors/')
    rethinkdb.get(AUTHOR, req.params.id).then((result) => {
        rethinkdb.delete(AUTHOR, req.params.id).then((resp) => {
            console.log(resp)
            elasticsearch.delete(AUTHOR, req.params.id, (error, response) => {
                if (error) {
                    console.error(error)
                    log.elasticsearch.error(error)
                    rep(Boom.badImplementation(error))
                } else {
                    console.log(response)
                    rep(response)
                }
            })
        }, (err) => {
            console.error(err)
            log.rethinkDB.error(err)
            rep(Boom.badImplementation(err))
        })
    }, (errr) => {
        rep(Boom.notFound(errr))
    })
}