const express = require("express");
const userController = require("../controller/userController.js");
const { jwtAuth } = require("../middleware/jwtAuthentication.js");

const router = express.Router();

// user routes
router.route("/register").post(userController.userRegister);
router.route("/login").post(userController.userLogin);
router.route("/update").put(jwtAuth, userController.updateUserDetails);
router.route("/upgradeUser").put(jwtAuth, userController.upgradeUser);
router.route("/changepassword").put(jwtAuth, userController.changePassword);
router.route("/getdetails").get(jwtAuth, userController.getUserById);

module.exports = router;

