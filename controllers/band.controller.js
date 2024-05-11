const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.createBand = (req, res, next) => {
  res.render("band/create-band");
};

module.exports.doCreateBand = (req, res, next) =>  {
  req.body.owner = req.currentUser.id;
  console.log(req.file);
  //si se ha subido una imagen
  if (req.file) {
    req.body.avatar = req.file.path;
  }

  Band.create(req.body)
  .then(() => {
    res.redirect("/user/profile")
  })
  .catch((err) => next(err))
}
module.exports.bandDetails = (req, res, next) => {
  const {bandId} = req.params;
  Band.findById(bandId)
    //.populate({path: "posts", populate: {path:"post"}})
    .then((band) => {
      res.render("band/band-details", {band})
    })
    .catch((err) => next(err))
};
module.exports.editBand = (req, res, next) => {
  const { bandId } = req.params;
  Band.findById(bandId)
    .then((band) => {
      res.render("band/edit", { band });
    })
    .catch((err) => next(err))
};
module.exports.uploadBand = (req, res, next) => {
  const { bandId } = req.params;
  if (req.file) {
    req.body.avatar = req.file.path
  }
  Band.findByIdAndUpdate(bandId, req.body, { new: true })
  .then(() => {
    res.redirect("/user/profile")
  })
  .catch((err) => next(err))
};
module.exports.deleteBand = (req, res, next) => {
  const { bandId } = req.params;
  Band.findByIdAndDelete(bandId)
    .then(() => {
      res.redirect("/user/profile");
    })
    .catch((error) => next(error));
};