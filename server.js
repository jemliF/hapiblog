'use strict'

const Hapi = require('hapi')
const log = require('./utils/log')
const sprintf = require("sprintf-js").sprintf
const Tv = require('tv')
const author = require('./api/routes/author')
const hapiAuthJwt2 = require('hapi-auth-jwt2')
const validation = require('./utils/validation')
let server = {}
server.start = function () {
    console.log('this method will start the hapi server')
    const hapiServer = new Hapi.Server()
    hapiServer.connection({port: 3000})
    /*const options = {
     ops: {
     interval: 1000
     },
     reporters: {
     myConsoleReporter: [{
     module: 'good-squeeze',
     name: 'Squeeze',
     args: [{log: '*', response: '*'}]
     }, {
     module: 'good-console'
     }, 'stdout'],
     myFileReporter: [{
     module: 'good-squeeze',
     name: 'Squeeze',
     args: [{ops: '*'}]
     }, {
     module: 'good-squeeze',
     name: 'SafeJson'
     }, {
     module: 'good-file',
     args: ['./logs/hapi.log']
     }],
     myHTTPReporter: [{
     module: 'good-squeeze',
     name: 'Squeeze',
     args: [{error: '*'}]
     }, {
     module: 'good-http',
     args: ['http://localhost:9000', {
     wreck: {
     headers: {'x-api-key': 12345}
     }
     }]
     }]
     }
     }

     hapiServer.register({
     register: [Tv],
     options: {}
     }, (err) => {

     if (err) {
     return console.error(err)
     }
     hapiServer.start((err) => {

     if (err) {
     log.main.error(err)
     }
     log.main.info(sprintf('Server running at: %s', hapiServer.info.uri))
     })
     })*/

    hapiServer.register(hapiAuthJwt2, (err) => {
        if (err) {
            console.log(err);
        } else {
            hapiServer.auth.strategy('jwt', 'jwt',
                {
                    key: process.env.JWT_SECRET,
                    validateFunc: validation.jwt,
                    verifyOptions: {algorithms: ['HS256']}
                });

            hapiServer.auth.default('jwt');

            hapiServer.route(author.get)
            hapiServer.route(author.save)
            hapiServer.route(author.update)
            hapiServer.route(author.delete)
            hapiServer.route(author.login)

            hapiServer.start((err) => {

                if (err) {
                    log.main.error(err)
                }
                log.main.info(sprintf('Server running at: %s', hapiServer.info.uri))
            })
        }
    })

}


module.exports = server