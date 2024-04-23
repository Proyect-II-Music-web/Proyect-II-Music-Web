require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const path = require('path');

//Exportamos el archivo de rutas
const session = require("./config/sessionBand.config");
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
app.use(session.getCurrentBand);
app.use(routes);

app.listen(3000, () => {
    console.log('App running at port 3000')
  });