const List = require("../models/list.model.js");

// Create and Save a new list
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a list
  const list = new List({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    image: req.body.image,
  });

  // Save list in the database
  List.create(list, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the list.",
      });
    else res.send(data);
  });
};

// Retrieve all lists from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  List.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lists.",
      });
    else res.send(data);
  });
};

// Find a single list by Id
exports.findOne = (req, res) => {
  List.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found list with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving list with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published lists
exports.findAllPublished = (req, res) => {
  List.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lists.",
      });
    else res.send(data);
  });
};

// Update a list identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  List.updateById(req.params.id, new List(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found list with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating list with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a list with the specified id in the request
exports.delete = (req, res) => {
  List.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found list with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete list with id " + req.params.id,
        });
      }
    } else res.send({ message: `list was deleted successfully!` });
  });
};

// Delete all lists from the database.
exports.deleteAll = (req, res) => {
  List.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all lists.",
      });
    else res.send({ message: `All lists were deleted successfully!` });
  });
};
