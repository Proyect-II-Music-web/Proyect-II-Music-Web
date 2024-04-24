const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.bandProfile = (req, res, next) => {
  res.render("band/profile");
};