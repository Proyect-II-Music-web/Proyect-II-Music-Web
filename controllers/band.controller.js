const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.register = (req, res, next) => {
  res.render("register");
}
module.exports.doRegister = (req, res, next) => {
    const renderWithErrors = (errors, values) => {
       res.render("register", {errors, values});
    }
    Band.create(req.body)
      .then((band) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors, req.body);
        } else {
          next();
        } 
      });
}