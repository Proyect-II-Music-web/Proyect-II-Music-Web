const router= require("express").Router();
const { 
    userRegister,
    doUserRegister,
    userLogin,
    doUserLogin,
    userProfile
} = require("../controllers/user.controller");
const { 
    bandProfile,
    createBand,
    doCreateBand,
} = require("../controllers/band.controller");

const {
    promoterProfile,
    createPost,
    doCreatePost,
    getPosts,
    postDetail,
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
router.get("/band/create-band", createBand)
router.post("/band/create-band", doCreateBand)
//Promoter
router.get("/promoter/profile", promoterProfile);
router.get("/promoter/post-event", createPost);
router.post("/promoter/post-event", doCreatePost)
router.get("/promoter/list-posts", getPosts);
router.get("/promoter/post/:postId", postDetail);
module.exports = router;

