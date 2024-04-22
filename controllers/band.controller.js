const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.register = (req, res, next) => {
    res.render("register");
}
module.exports.doRegister = (req, res, next) => {
    const renderWithErrors = (errors, values)=>{
        res.render("register", {errors, values});
    }
    console.log(req.body)
    Band.create(req.body)
    console.log(req.body)
        .then((band) => {
          console.log(band);
          res.redirect("/login")  
        })
        .catch((err) => {
          console.log(err);
          //if (err instanceof mongoose.Error.ValidationError) {
          //  renderWithErrors(err.errors, req.body);
          //} else {
          //  next();
          //} 
        })
        
}