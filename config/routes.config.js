const router= require("express").Router();
const { 
    userRegister,
    doUserRegister,
    userLogin,
    doUserLogin,
    userProfile,
    getPostForPublic,
    logout
} = require("../controllers/user.controller");
const { 
    createBand,
    doCreateBand,
    bandDetails
} = require("../controllers/band.controller");

const {
    promoterProfile,
    createPost,
    doCreatePost,
    getPosts,
    postDetail,
    addBand,
    closePostEvent,
} = require("../controllers/promoter.controller");
const {
    doApplicate
} = require("../controllers/application.controller");

const {
    isAuthenticated,
    isNoAuthenticated
} = require("../middlewares/auth.middleware")

const {
    isPromoter,
    userHasBand
} = require("../middlewares/roles.middleware")


router.get("/", (req, res, next) => res.render("home"));

//User
router.get("/user/register", isNoAuthenticated, userRegister);
router.post("/user/register", isNoAuthenticated, doUserRegister);
router.get("/user/login", isNoAuthenticated, userLogin);
router.post("/user/login", isNoAuthenticated, doUserLogin);
router.get("/user/profile", isAuthenticated, userProfile);
router.get("/user/list-post/public", isAuthenticated, getPostForPublic)
router.get("/user/logout", isAuthenticated, logout)

//Band

router.get("/band/create-band", isAuthenticated, createBand)
router.post("/band/create-band", isAuthenticated, doCreateBand)
router.get("/band/:ownerId/details", isAuthenticated, bandDetails)
//Promoter
router.get("/promoter/profile",isAuthenticated, isPromoter,  promoterProfile);
router.get("/promoter/post-event", isAuthenticated, isPromoter, createPost);
router.post("/promoter/post-event", isAuthenticated, isPromoter, doCreatePost)
router.get("/promoter/list-posts",isAuthenticated, getPosts);
router.get("/promoter/post/:postId", isAuthenticated, postDetail);
router.post("/promoter/post/:postId/add-band/:bandId/:appId",isAuthenticated, isPromoter, addBand);
router.post("/promoter/post/:postId/close-post", closePostEvent)

//Solicitud
router.post("/promoter/post/:postId/application", doApplicate);
module.exports = router;

