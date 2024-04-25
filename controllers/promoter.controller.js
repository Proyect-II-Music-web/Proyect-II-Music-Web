const mongoose = require("mongoose");
const Post = require("../models/Post.model");

module.exports.promoterProfile = (req, res, next) => {
    res.render("promoter/profile");
};
module.exports.createPost = (req, res, next) => {
    res.render("promoter/post");
};
module.exports.doCreatePost = (req, res, next) => {
    const renderWithErrors = (errors, values) => {
        res.render("promoter/post", { errors, values });
      };
      console.log("antes", req.body)
      Post.create(req.body)
        .then((post) => {
          console.log("promesa", post);
          res.redirect("/promoter/list-posts");
        })
        .catch((err) => {
          console.log(err);
          //if (err instanceof mongoose.Error.ValidationError) {
          //  renderWithErrors(err.errors, req.body);
          //} else {
          //  next()
          //}
        });
};
module.exports.getPosts = (req, res, next) => {
  Post.find()

    .then((posts) => {
      console.log(posts);
      res.render("promoter/list", { posts });
    })
    .catch((err) => next(err));
};
module.exports.postDetail = (req, res, next) => {
  const {postId} = req.params;
  Post.findById(postId)
    .then((post) => {
      console.log("post", post);
      res.render("promoter/post-detail", { post })
    })
    .catch((err) => next())
};