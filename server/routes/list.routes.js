module.exports = (app) => {
  const lists = require("../controllers/list.controller.js");

  var router = require("express").Router();

  // Create list
  router.post("/", lists.create);

  // get all lists
  router.get("/", lists.findAll);

  // get all published lists
  router.get("/published", lists.findAllPublished);

  // get a list with id
  router.get("/:id", lists.findOne);

  // Update a list with id
  router.put("/:id", lists.update);

  // Delete a list with id
  router.delete("/:id", lists.delete);

  // Delete all lists
  router.delete("/", lists.deleteAll);

  app.use("/api/lists", router);
};
