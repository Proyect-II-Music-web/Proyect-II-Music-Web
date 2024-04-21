const router= require("express").Router();
const { 
    register,
    doRegister
} = require("../controllers/band.controller");

router.get("/", (req, res, next) => res.render("home"));

//Band
router.get("/register", register);
router.post("/register", doRegister);

module.exports = router;

