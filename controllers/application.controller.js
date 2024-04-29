const { post } = require("../config/routes.config");
const Application = require("../models/Application.model");
const Post = require("../models/Post.model");

module.exports.doApplicate = (req, res, next) => {
  //buscar el post y comprobar que isClosed = false if
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      if (post.isClosed === false) {
        return Application.findOne({
          user: req.currentUser._id,
          post: req.params.postId,
        }).then((application) => {
          if (application) {
            //Hay que quitar la solicitud(application)
            return Application.findByIdAndDelete(application._id).then(
              res.redirect(`/promoter/post/${req.params.postId}`)
            );
          } else {
            return Application.create({
              user: req.currentUser._id,
              post: req.params.postId,
            }).then(res.redirect(`/promoter/post/${req.params.postId}`));
          }
        });
      } else {
      }
    })
    .catch((err) => next(err));
};
