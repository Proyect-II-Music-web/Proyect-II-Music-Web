const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Application = require("../models/Application.model");
const { populate } = require("dotenv");


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
      Post.create(req.body)
        .then((post) => {
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
      res.render("promoter/list", { posts });
    })
    .catch((err) => next(err));
};
module.exports.postDetail = (req, res, next) => {
  const {postId} = req.params;
  Post.findById(postId)
    .populate({path: "applications", populate:{path: "user"}})
    .then((post) => {
      if (!post) {
        next(createError(404, "No tienes solicitudes a eventos"))
      }
      if (req.currentUser) {
        return Application.findOne({user: req.currentUser._id, post: postId})
          .then((application) => {
            if (application) {
              res.render("promoter/post-detail", { post, applicated: Boolean(application) })
            } else {
              res.render("promoter/post-detail", {post})
            }
          })
      }
      
    })
    .catch((err) => next())
};