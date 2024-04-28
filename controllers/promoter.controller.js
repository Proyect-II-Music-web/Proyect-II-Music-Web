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
  Post.find(userIsPromoter ? {owner: req.currentUser.id} : {isClosed: !userHasBands})
    //.populate("posts")
    .then((posts) => {
      res.render("promoter/list", { posts });
    })
    .catch((err) => next(err));
};
module.exports.postDetail = (req, res, next) => {
  const {postId} = req.params;
  Post.findById(postId)
    //.populate({path: "bands", populate: {path:"band"}})
    .populate({path: "applications", populate:{path: "user"}})
    
    .then((post) => {
      console.log("postWithBanns", post);
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
  const {postId} = req.params;
  Post.findById(postId)
    .populate("band")
    .then((post) => {
      console.log(post);
      res.render("promoter/posts-with-band")
    })
    .catch((err) => next(err))
}