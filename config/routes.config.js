const router= require("express").Router();
const { 
    userRegister,
    doUserRegister,
    userLogin,
    doUserLogin,
    userProfile
} = require("../controllers/user.controller");
const { 
    bandProfile
} = require("../controllers/band.controller");

const {
    promoterProfile,
} = require("../controllers/promoter.controller");

router.get("/", (req, res, next) => res.render("home"));

//User
router.get("/user/register", userRegister);
router.post("/user/register", doUserRegister);
router.get("/user/login", userLogin);
router.post("/user/login", doUserLogin);
router.get("/user/profile", userProfile);

//Band
router.get("/band/profile", bandProfile);
//Promoter
router.get("/promoter/profile", promoterProfile);

module.exports = router;

