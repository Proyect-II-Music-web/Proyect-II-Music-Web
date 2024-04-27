module.exports.isAuthenticated = ( req, res, next) => {
    if(req.currentUser) {
        next();
    } else {
        res.redirect("/user/login")
    }
}

module.exports.isNoAuthenticated = ( req, res, next) => {
    if(req.currentUser) {
        res.redirect("/user/profile")
    } else {
        next();
    }
}
