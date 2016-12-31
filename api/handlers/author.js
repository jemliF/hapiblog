const elasticsearch = require('../../services/elasticsearch')
const rethinkdb = require('../../services/rethinkdb')
const log = require('../../utils/log')
const Boom = require('boom')
const Validation = require('../../utils/validation')
const Joi = require('joi')
const AUTHOR = 'author', ARTICLE = 'article'

exports.getAll = (req, rep) => {
    log.main.debug('[GET]   /api/v1/authors/' + req.params.id)
    rethinkdb.getAll(AUTHOR).then((documents) => {
        rep(documents)
    }, (err) => {
        log.rethinkDB.error(err)
        rep(Boom.badImplementation(err))
    })
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
            rethinkdb.add(AUTHOR, req.payload)
            /* .then((resp) => {
             console.log(resp)
             elasticsearch.add(AUTHOR, resp, (err, resp) => {
             if (err) {
             log.elasticsearch.error(err)
             rep(Boom.badImplementation(err))
             } else {
             console.log(resp)
             }
             })
             }, (err) => {
             log.rethinkDB.error(err)
             rep(Boom.badImplementation(err))
             })*/
        }
    })
}