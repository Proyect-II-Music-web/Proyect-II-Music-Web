const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.bandProfile = (req, res, next) => {
  res.render("band/profile");
};

module.exports.createBand = (req, res, next) => {
  res.render("band/create-band");
};

module.exports.doCreateBand = (req, res, next) =>  {
  Band.create(req.body)
  .then(() => {
    res.redirect("/band/profile")
  })
  .catch((err) => next())
}