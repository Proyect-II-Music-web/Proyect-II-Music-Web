module.exports.isPromoter= (req, res, next) => {
    if (req.currentUser.role === "promoter") {
        next();
    } else {
        res.redirect("/user/profile");
    }
}
module.exports.userHasBand = (req, res, next) => {
    if (req.currentUser?.bands?.length > 0) {
        next();
    } else{
        res.redirect("/");
    }

}