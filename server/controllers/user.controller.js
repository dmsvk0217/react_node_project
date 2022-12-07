const User = require("../models/user.model");

exports.login = (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password });
  const id = req.uid;
  console.log("login 가즈아!!!");
  User.login(user, id, (err, data) => {
    if (err) {
      res.status(500).json(data || "Some error occured while logining user");
    }
    res.json(data);
  });
};

//Q : USER ID를 넘겨야 하는가?
exports.register = (req, res) => {
  //validate request check
  if (!req.body) {
    res.status(400).send({
      data: "Content can not be empty!",
    });
  }

  const user = new User({ email: req.body.email, password: req.body.password });
  User.register(user, (err, data) => {
    if (err) {
      res.status(500).json(data || "Some error occured while registering user");
    }
    res.json(data);
  });
};
