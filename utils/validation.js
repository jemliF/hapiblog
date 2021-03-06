const Joi = require('joi')
const rethinkdb = require('../services/rethinkdb')
var AuthorSchema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(7).required(),
    email: Joi.string().email().required()
})
exports.Author = AuthorSchema

var ArticleSchema = Joi.object().keys({
    title: Joi.string().alphanum().min(3).required(),
    content: Joi.string().alphanum().min(200).required(),
    tags: Joi.array().items(Joi.string()).max(10).required(),
    createdAt: Joi.date().default(Date.now, 'Creation date')
})

exports.Article = ArticleSchema

exports.jwt = (decoded, request, next) => {
    rethinkdb.getByEmailAndPassword(decoded.email, decoded.password)
        .then((resp) => {
            return next(null, true)
        }, (err) => {
            return next(null, false)
        })
}