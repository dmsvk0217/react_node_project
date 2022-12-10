module.exports = (app) => {
  const { verifySign } = require("../middleware");
  const userController = require("../controllers/user.controller");

  var router = require("express").Router();

  router.post("/login", verifySign.checkEmailAndPassword, userController.login);

  router.post("/register", verifySign.checkEmail, userController.register);

  app.use("/api/user", router);
};
