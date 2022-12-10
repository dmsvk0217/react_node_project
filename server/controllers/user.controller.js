const User = require("../models/user.model");

exports.login = (req, res) => {
  console.log("cookie : ", req.cookies);

  const user = new User({
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  });

  const id = req.body.id;

  console.log("login 가즈아!!!");
  console.log("req.body.id : ", id);

  User.generateToken(user, (err, result) => {
    if (err) return res.status(400).send(err);

    //쿠키에 토큰저장하기
    console.log("user.token : ", user.token);
    console.log("user.id : ", user.id);
    res
      .cookie("x_auth", user.token)
      .status(200)
      .json({ userId: user.id, loginSuccess: true });
    // login 성공 메세지와 userid넘기기
  });
};

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

exports.auth = (req, res) => {
  //auth 인증 완료된 상태.
  const user = req.user;
  const data = { userid: user.id, email: user.email };
  console.log("controller auth : ", user);
  res.json(data);
};
