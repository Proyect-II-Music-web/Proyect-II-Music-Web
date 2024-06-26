require('dotenv').config()
const Post = require("./models/Post.model.js");
const User = require("./models/User.model.js");
const Application = require("./models/Application.model.js");

const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const path = require('path');

//Exportamos el archivo de rutas
require("./helpers/helper")
const session = require("./config/session.config");
const routes = require("./config/routes.config");

//conectamos a base de datos
require('./config/db.config');

// Instanciamos express
const app = express();

// Midlewares
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(session.sessionConfig);
app.use(session.getCurrentUser);

app.use(routes);

app.listen(3000, () => {
  //Solcitudes
      Post.find()
      .then((posts) => {
        User.find({role: "user"})
          .then((users) => {
           const appsPromises = users.map((user) => {
              return Application.create({
                user: user._id,
                post: posts[2]._id
              })
          })

           Promise.all(appsPromises)
          .then((apps) => {
            console.log(apps)
          })
      } )
     }) 

  //ASISTENCIA
    //  Post.findOne({
    //   title:"Concierto de Rock"})
    //  .then((post) => {
    //    User.find()
    //      .then((users) => {
    //          const appsPromises = users.map((user) => {
    //            return Post.updateOne(
    //              {_id: post._id,
    //               $expr: { $lt: [ { $size: "$assistans" }, "$maxForum" ] } },
    //              { $addToSet: { assistans: user._id } }
    //            )
    //      })

    //          Promise.all(appsPromises)
    //          .then((assists) => {
    //            console.log(assists)
    //          })
    //          .catch((err) => console.log(err))
    //      })
    //      console.log('App running at port 3000')
    //    })



  })