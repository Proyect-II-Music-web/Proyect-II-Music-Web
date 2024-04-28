const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.createBand = (req, res, next) => {
  res.render("band/create-band");
};

module.exports.doCreateBand = (req, res, next) =>  {
  req.body.owner = req.currentUser.id;
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
    .catch((err) => next())
};