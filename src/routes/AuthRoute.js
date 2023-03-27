const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/Auth.middleware");

router.post("/login", AuthController.login);
router.post("/register", AuthController.signUp);
router.get('/user', AuthMiddleware.isAuthorised, AuthController.getUserInfo);
router.put('/user', AuthMiddleware.isAuthorised, AuthController.updateUserProfile);
router.delete('/user', AuthMiddleware.isAuthorised, AuthController.deleteUserAccount);

module.exports = router;
