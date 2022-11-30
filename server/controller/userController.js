const User = require("../model/User");

exports.login = (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password });

  User.login(user, (err, data) => {
    if (err) {
      res.status(500).json(data || "Some error occured while logining user");
    }
    res.json(data);
  });
};

//Q : USER ID를 넘겨야 하는가?
exports.register = (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password });

  User.register(user, (err, data) => {
    if (err) {
      res.status(500).json(data || "Some error occured while registering user");
    }
    res.json(data);
  });
};
