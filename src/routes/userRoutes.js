const express = require("express");
const userController = require("../controller/userController.js");
const { jwtAuth } = require("../middleware/jwtAuthentication.js");

const router = express.Router();

// user routes
router.post(
    "/register",
    userController.userRegister
);

router.post(
    "/login",
    userController.userLogin
);

router.put(
    "/update",
    jwtAuth,
    userController.updateUserDetails
);

module.exports = router;

