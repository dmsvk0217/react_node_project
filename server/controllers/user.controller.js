const User = require("../models/user.model");
const db = require("../models/db");

exports.login = (req, res) => {
  console.log("cookie : ", req.cookies);

  const user = new User({
    UID: req.body.UID,
    email: req.body.email,
    password: req.body.password,
  });

  const UID = req.body.UID;

  console.log("login 가즈아!!!");
  console.log("req.body.UID : ", UID);

  User.generateToken(user, (err, result) => {
    if (err) return res.status(400).send(err);

    //쿠키에 토큰저장하기
    console.log("user.token : ", user.token);
    console.log("user.UID : ", user.UID);
    res
      .cookie("x_auth", user.token)
      .status(200)
      .json({ userId: user.UID, loginSuccess: true });
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
  res.json({ isAuth: true, userid: user.UID, email: user.email });
};

exports.logout = (req, res) => {
  const user = req.user;
  //db에서 user.token값 null로 만들기.
  var sql = "UPDATE user set token=NULL where UID=?";
  db.query(sql, [user.UID], function (err, result) {
    if (err) res.status(500).send(err);
    console.log("로그아웃 성공");
    return res.json({ logoutSuccess: true });
  });
};
