'use strict'

const elasticsearch = require('elasticsearch')
const log = require('../../utils/log')

let elasticsearchClient = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL,
    log: 'trace'
})

exports.check = (next) => {
    elasticsearchClient.ping({
        requestTimeout: Infinity
    }, (err) => {
        next(err)
    })
}

exports.createType = (type, mapping, next) => {
    typeExists(type, (err, resp) => {
        if (err) {
            log.elasticsearch.error(err)
        } else {
            log.elasticsearch.debug(resp)
            if (resp !== false) {
                elasticsearchClient.indices.create({
                    index: 'blog',
                    mappings: mapping
                }, (err, resp, respcode) => {
                    log.elasticsearch.error(err)
                    log.elasticsearch.debug(resp)
                    log.elasticsearch.debug(respcode)
                    next(err, resp, respcode)
                })
            }
        }
    })

}

/*let indexExists = (index, next) => {
 elasticsearchClient.indices.exists({
 index: process.env.MAIN_INDICE
 }, (err, resp) => {
 next(err, resp)
 })
 }*/

let typeExists = (type, next) => {
    elasticsearchClient.indices.existsType({
        index: 'blog',
        type: type
    }, (err, resp) => {
        next(err, resp)
    })
}