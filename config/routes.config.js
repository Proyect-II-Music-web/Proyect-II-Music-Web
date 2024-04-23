const router= require("express").Router();
const { 
    bandRegister,
    doBandRegister,
    bandLogin,
    doBandLogin,
    bandProfile
} = require("../controllers/band.controller");

router.get("/", (req, res, next) => res.render("home"));

//Band
router.get("/band/register", bandRegister);
router.post("/band/register", doBandRegister);
router.get("/band/login", bandLogin);
router.post("/band/login", doBandLogin);
router.get("/band/profile", bandProfile);


module.exports = router;

