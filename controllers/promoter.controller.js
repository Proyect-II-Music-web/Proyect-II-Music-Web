const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Application = require("../models/Application.model");
const {formatDate } = require("../utils/date");

module.exports.promoterProfile = (req, res, next) => {
  res.render("promoter/profile");
};
module.exports.createPost = (req, res, next) => {
  res.render("promoter/post");
};
module.exports.doCreatePost = (req, res, next) => {
  req.body.owner = req.currentUser.id;
  if (req.body.tags) {
    req.body.tags = req.body.tags.split(',')
  }
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
  const userIsPromoter = req.currentUser.role === "promoter";
  const userHasBands = req.currentUser?.bands?.length > 0;
  //Post.find(userIsPromoter ? {owner: req.currentUser.id} : {isClosed: !userHasBands})
  Post.find(
    userIsPromoter ? { owner: req.currentUser.id } : { isClosed: false }
  )
    .then((posts) => {
      res.render("promoter/list", { posts});
    })
    .catch((err) => next(err));
};
module.exports.postDetail = (req, res, next) => {
  const { postId } = req.params;
  //limitar la busqueda a 3  post
  const {page = 0} = req.query

  const ITEMS_PER_PAGE = 3

  const limit = page ? page * ITEMS_PER_PAGE + ITEMS_PER_PAGE : ITEMS_PER_PAGE
  // Obtener la fecha actual y la fecha un mes después
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 6);

  // Realizar la consulta para encontrar eventos entre la fecha actual y un mes después
  Post.find({
    date: {
      $gte: currentDate,
      $lte: oneMonthLater,
    },
    _id: { $ne: postId }
  })
  .limit(limit)
    .then((posts) => {
      
      Post.findById(postId)
        .populate({
          path: "applications",
          populate: {
            path: "user",
            populate: {
              path: "band",
            },
          },
        })
        .populate("bands")
        .then((post) => {
          if (!post) {
            //next(createError(404, "No tienes eventos"));
            res.render("promoter/post-detail");
          }
          if (req.currentUser) {
            return Application.findOne({
              user: req.currentUser._id,
              post: postId,
            }).then((application) => {
              res.render("promoter/post-detail", {
                post,
                posts,
                applicated: Boolean(application),
              });
            });
          }
        });
    })
    .catch((err) => next(err));
};
module.exports.addBand = (req, res, next) => {
  const { postId, bandId, appId } = req.params;
  Post.findByIdAndUpdate(postId, { $push: { bands: bandId } }, { new: true })
    .then((post) => {
      return Application.findByIdAndDelete(appId).then(() => {
        res.redirect(`/promoter/post/${postId}`);
      });
    })
    .catch((err) => next(err));
};
module.exports.closePostEvent = (req, res, next) => {
  const { postId } = req.params;
  Post.findByIdAndUpdate(postId, { isClosed: true }, { new: true })
    .then((post) => {
      console.log(post);
      res.redirect("/promoter/list-posts");
    })
    .catch((err) => next(err));
};
module.exports.editPost = (req, res, next) => {
  const {
    postId
  } = req.params;

  Post.findById(postId)
  .then((post) => {
    res.render("promoter/edit-post", {post, date: formatDate(new Date(post.date))}, );
  })
  .catch(err => next(err))
};

module.exports.updatePost = (req, res, next) => {
  const { postId } = req.params;
  if (req.file) {
    req.body.avatar = req.file.path
  }
  Post.findByIdAndUpdate(postId, req.body, { new: true })
  .then((post) => {
    console.log(post)
    res.redirect(`/promoter/post/${postId}`)
  })
  .catch((err) => next(err))
};

module.exports.deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId)
    .then(() => {
      res.redirect("/promoter/list-posts");
    })
    .catch((error) => next(error));
};