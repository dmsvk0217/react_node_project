const { verifySign } = require("../middleware");
const userController = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/login", verifySign.checkEmailAndPassword, userController.login);

  router.post("/register", verifySign.checkEmail, userController.register);

  app.use("/api/user", router);
};
