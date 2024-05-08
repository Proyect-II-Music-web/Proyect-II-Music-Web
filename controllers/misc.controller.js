const Post = require("../models/Post.model")
module.exports.getHome = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.render("home", {posts})

        })
        .catch((err) => next(err))
}