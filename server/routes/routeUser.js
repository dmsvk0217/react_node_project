module.exports = (app) => {
  const userController = require("../controller/userController");
  const router = require("express").Router();

  router.post("/login", userController.login);

  router.post("/register", userController.register);

  app.use("/api/user", router);
};
