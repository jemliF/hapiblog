const elasticsearch = require('./data/elasticsearch/index')
const authorMapping = require('./mappings/author.json')
const articleMapping = require('./mappings/article.json')


//Creating Types
elasticsearch.createType('author', authorMapping, (err, resp, respCode) => {
    if (err) {
        log.elasticsearch.error(err)
    } else {
        log.elasticsearch.debug(resp)
        log.elasticsearch.debug(respCode)
        elasticsearch.createType('article', articleMapping, (err, resp, respCode) => {
            if (err) {
                log.elasticsearch.error(err)
            } else {
                log.elasticsearch.debug(resp)
                log.elasticsearch.debug(respCode)
            }
        })
    }
})