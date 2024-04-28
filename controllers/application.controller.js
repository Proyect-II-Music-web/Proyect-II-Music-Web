const Application = require("../models/Application.model");

module.exports.doApplicate = (req, res, next) => {
    Application.findOne({user: req.currentUser._id, post: req.params.postId})
        .then((application) => {
            if (application) {
                //Hay que quitar la solicitud(application)
                return Application.findByIdAndDelete(application._id)
                    .then(res.redirect(`/promoter/post/${req.params.postId}`))
            }else{
                return Application.create({user: req.currentUser._id, post: req.params.postId})
                    .then(res.redirect(`/promoter/post/${req.params.postId}`))
            }
        })
        .catch((err) => next(err))
}
