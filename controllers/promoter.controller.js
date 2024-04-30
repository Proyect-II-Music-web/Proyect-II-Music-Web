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
    req.body.owner = req.currentUser.id;
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
  const userIsPromoter = req.currentUser.role === 'promoter';
  const userHasBands = req.currentUser?.bands?.length > 0;
  //Post.find(userIsPromoter ? {owner: req.currentUser.id} : {isClosed: !userHasBands})
  Post.find(userIsPromoter ? {owner: req.currentUser.id} : {isClosed: false})
    .then((posts) => {
      res.render("promoter/list", { posts });
    })
    .catch((err) => next(err));
};
module.exports.postDetail = (req, res, next) => {
  const {postId} = req.params;
  Post.findById(postId)
    .populate({ 
      path: "applications", 
      populate:{
        path: "user", 
        populate: { 
          path: 'band'
        }
      }
    })
    .populate("bands")
    .then((post) => {
      if (!post) {
        next(createError(404, "No tienes eventos"))
      }
      if (req.currentUser) {
        return Application.findOne({user: req.currentUser._id, post: postId})
          .then((application) => {
            res.render("promoter/post-detail", { post, applicated: Boolean(application) })
          })
      }
      
    })
    .catch((err) => next())
};
module.exports.addBand = (req, res, next) => {
  const {postId, bandId, appId} = req.params;
  Post.findByIdAndUpdate(postId, { $push: { bands: bandId } }, { new: true})
    .then((post) => {
      return Application.findByIdAndDelete(appId)
      .then(() => {
        res.redirect(`/promoter/post/${postId}`);
      })
      
    })
    .catch((err) => next(err))
}
module.exports.closePostEvent = (req, res, next) => {
  const {postId} = req.params;
  Post.findByIdAndUpdate(postId, {isClosed: true}, { new: true})
    .then((post) => {
      console.log(post);
      res.redirect("/promoter/list-posts");
    })
    .catch((err) => next(err))
}