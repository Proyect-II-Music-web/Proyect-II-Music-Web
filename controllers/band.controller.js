const mongoose = require("mongoose");
const Band = require("../models/Band.model");

module.exports.bandRegister = (req, res, next) => {
  res.render("band/register");
};
module.exports.doBandRegister = (req, res, next) => {
  const renderWithErrors = (errors, values) => {
    res.render("band/register", { errors, values });
  };
  Band.create(req.body)
    .then((band) => {
      res.redirect("/band/login");
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors, req.body);
      } else {
        next();
      }
    });
};
module.exports.bandLogin = (req, res, next) => {
  res.render("band/login");
};
module.exports. doBandLogin = (req, res, next) => {
  //deconstrir el body
  const {email, password} = req.body;
  //crear una función de errores
  const renderWithErrors = () => {
    res.render("band/login", {
      errors: {
        message: "Email o contraseña incorrectos"
      }
    });
  };
  //Comprobamos que los campos no esten vacios
  if (!email || !password) {
    renderWithErrors();
  }
  //Ahora buscamos si existe el usuario por su email
  Band.findOne({email: email})
    .then((band) => {
      //si existe user será truty
      if (band) {
        return band.checkPassword(password)
          .then((match) => {
            if (match) {
              console.log("controller",req.session);
              //Aquí se pasa el id del usuario a la session
              req.session.bandId = band.id;
              //Si todo va bien nos redirige a la ruta del perfil
              res.redirect("/band/profile")
            } else {
              renderWithErrors();
            }
          })
      } else {
        renderWithErrors();
      }
    })
    .catch((err) => next(err));
};
module.exports.bandProfile = (req, res, next) => {
  res.render("band/profile");
};