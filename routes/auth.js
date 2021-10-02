const { Router } = require("express");
const router = Router();
const {
    googleInit,
    googleCallback,
    logOut
} = require("../controllers/authController")

router.get("/google", googleInit)

router.get("/google/callback",googleCallback)

module.exports = router;