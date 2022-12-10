module.exports = (app) => {
  const { verifySign, auth } = require("../middleware");
  const userController = require("../controllers/user.controller");

  var router = require("express").Router();

  router.post("/login", verifySign.checkEmailAndPassword, userController.login);

  router.post("/register", verifySign.checkEmail, userController.register);

  router.post("/auth", auth, userController.auth);

  router.post("/logout", auth, userController.logout);

  app.use("/api/user", router);
};
