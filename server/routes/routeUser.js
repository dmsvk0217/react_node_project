module.exports = (app) => {
  const userController = require("../controller/userController");
  const router = require("express").Router();

  router.post("/api/user/login", userController.login);

  router.post("/api/user/register", userController.register);

  app.use(router);
};
