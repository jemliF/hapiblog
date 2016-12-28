'use strict'
const server = require('./server')
const log = require('./utils/log')
const elasticsearch = require('./data/elasticsearch/index')
const rethinkdb = require('./data/rethinkdb/index')

elasticsearch.check((error) => {
    if (error) {
        log.elasticsearch.error('Elasticsearch cluster is down')
    } else {
        log.elasticsearch.info('Elasticsearch is running')
        //Creating Elasticsearch index & types
        elasticsearch.createType('author', require('./mappings/author.json'), (err, resp, respCode) => {
            if (err) {
                log.elasticsearch.error(err)
            } else {
                log.elasticsearch.debug(resp)


                //After all is OK
                server.start()
            }
        })
    }
})


