const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
//exportamos la url de mongo de nuestro db-config
const DB = require("./db.config");
const User = require("../models/User.model");

//Constate de vida tiempo en días
const MAX_AGE = 7;

module.exports.sessionConfig = expressSession({
    //La contraseña que usa la sesion
    secret: process.env.SESSION_SECRET || "super-secret",
    //resave = guarda una sesion
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.COOKIE_SECURE === "true" ? true : false,
        httpOnly: true,
        maxAge: 24 * 3600 * 1000 * MAX_AGE,
    },
    store: new MongoStore({
        mongoUrl: DB,
        ttl: 24 * 3600 * MAX_AGE,
    })
})

//Obtenemos el current user para poder usar sus datos en todas las vistas
module.exports.getCurrentUser = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId)
            .populate("band")
        //Aqui pupularemos el post del evento para tenerlo en la session
            .then((user) => {
                req.currentUser = user;
                res.locals.currentUser = user;
                next();
            })
            .catch((err) => next(err))
    } else {
        next();
    }
}