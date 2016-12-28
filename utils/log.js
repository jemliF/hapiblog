let log4js = require('log4js')

let createLogger = function (loggerName, level, appender) {
    if (appender === 'file') {
        log4js.loadAppender(appender)
        log4js.addAppender(log4js.appenders.file('logs/blog.log'), loggerName)
    }

    let logger = log4js.getLogger(loggerName)
    logger.setLevel(level)
    return logger
}

exports.main = createLogger('MAIN', 'TRACE', 'file')
exports.elasticsearch = createLogger('ELASTICEARCH', 'TRACE', 'file')
exports.rethinkDB = createLogger('RETHINKDB', 'TRACE', 'file')