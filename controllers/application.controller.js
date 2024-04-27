const Application = require("../models/Application.model");

module.exports.doApplicate = (req, res, next) => {
    Application.findOne({user: req.curretUser._id, post: req.param.id})
        .then((application) => {
            if (application) {
                //Hay que quitar la solicitud(application)
                return Application.findByIdAndDelete(application._id)
                    .then(res.redirect(`/promoter/post/${req.param.id}`))
            }else{
                return Application.create({user: req.curretUser._id, post: req.param.id})
                    .then(res.redirect(`/promoter/post/${req.params.id}`))
            }
        })
}