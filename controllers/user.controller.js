const mongoose = require("mongoose");
const User = require("../models/User.model");
module.exports.userRegister = (req, res, next) => {
    res.render("user/register");
};
module.exports.doUserRegister = (req, res, next) => {
  const renderWithErrors = (errors, values) => {
    res.render("user/register", { errors, values });
  };
  User.create(req.body)
    .then(() => {
      res.redirect("/user/login");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors, req.body);
      } else {
        next();
      }
    });
};
module.exports.userLogin = (req, res, next) => {
  res.render("user/login");
};
module.exports.doUserLogin = (req, res, next) => {
  //deconstrir el body
  const {email, password} = req.body;
  //crear una función de errores
  const renderWithErrors = () => {
    res.render("user/login", {
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
  User.findOne({email: email})
    .then((user) => {
      //si existe user será truty
      if (user) {
        return user.checkPassword(password)
          .then((match) => {
            if (match) {
              //Aquí se pasa el id del usuario a la session
              req.session.userId = user.id;
              //Si todo va bien nos redirige a la ruta del perfil
              res.redirect("/user/profile")
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
module.exports.userProfile = (req, res, next) => {
  res.render("user/profile");
};