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
  const {ownerId} = req.params;
  Band.find({owner: ownerId})
    //.populate({path: "posts", populate: {path:"post"}})
    .then((bands) => {
      console.log("bands",bands);
      res.render("band/band-details", {bands})
    })
    .catch((err) => next(err))
};
module.exports.editBand = (req, res, next) => {
  const { bandId } = req.params;
  Band.findById(bandId)
    .then((band) => {
      res.render("band/create-band", { band });
    })
    .catch((err) => next(err))
};