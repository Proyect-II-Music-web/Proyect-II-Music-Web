const mongoose = require("mongoose");
const User = require("../models/User.model");
const Band = require("../models/Band.model");
const Post = require("../models/Post.model");
const genresArr = require('../constants/genres');

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
  const { email, password } = req.body;
  //crear una función de errores
  const renderWithErrors = () => {
    res.render("user/login", {
      errors: {
        message: "Email o contraseña incorrectos",
      },
    });
  };
  //Comprobamos que los campos no esten vacios
  if (!email || !password) {
    renderWithErrors();
  }
  //Ahora buscamos si existe el usuario por su email
  User.findOne({ email: email })
    .then((user) => {
      //si existe user será truty
      if (user) {
        return user.checkPassword(password).then((match) => {
          if (match) {
            //Aquí se pasa el id del usuario a la session
            req.session.userId = user.id;
            //Si todo va bien nos redirige a la ruta del perfil
            res.redirect("/user/profile");
          } else {
            renderWithErrors();
          }
        });
      } else {
        renderWithErrors();
      }
    })
    .catch((err) => next(err));
};

module.exports.userProfile = (req, res, next) => {
  Band.findOne({owner: req.currentUser._id})
    .then((band) => {
      res.render("user/profile", { band });
    })
    .catch((err) => next(err))
};
module.exports.doAssist = (req, res, next) => {
  const { postId } = req.params;

  //Post.findByIdAndUpdate(postId, { $addToSet: { assistans:  req.currentUser._id} })
  Post.updateOne(
    {
      _id: postId,
      //maxForum: { $gt: { $size: "$assistans" } },
      $expr: { $lt: [ { $size: "$assistans" }, "$maxForum" ] }
    },
    { $addToSet: { assistans: req.currentUser._id } }
  )
    .then((post) => {
      console.log(post)
      res.redirect(`/promoter/post/${postId}`);
    })
    .catch((err) => next(err));
};

module.exports.getPostForPublic = (req, res, next) => {
  const { genres,  } = req.query;
  const query = {isClosed: true}
  if (genres) {
    query.tags = genres
  }
  Post.find(query)
    .then((posts) => {
      res.render("user/list-post-public", {posts, genres: genresArr})
    })
    .catch((err) => next(err));
};
module.exports.editUserProfile = (req, res, next) => {
  res.render("user/edit");
};

module.exports.updateUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.currentUser._id, req.body, { new: true })
  .then(() => {
    res.redirect("/user/profile")
  })
  .catch((err) => next(err))
  res.render("user/edit");
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/user/login");
};
