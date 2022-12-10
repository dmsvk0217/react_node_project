const jwt = require("jsonwebtoken");
const secret = require("../config/auth.config");
const db = require("../models/db");

let auth = (req, res, next) => {
  //cookies 값 가지고
  const token = req.cookies.x_auth;
  console.log("🚀 ~ file: auth.js:8 ~ auth ~ token", token);
  sql = "select * from user where uid=? and token=?";
  //jwt 복호화 한후
  jwt.verify(token, secret.secretToken, (err, decode) => {
    console.log("🚀 ~ file: auth.js:12 ~ jwt.verify ~ decode", decode);
    // decode 값 is userid
    if (err) res.status(500).send(err);
    db.query(sql, [decode, token], (err, user) => {
      console.log("🚀 ~ file: auth.js:16 ~ db.query ~ user", user);
      if (err) res.status(500).send(err);
      if (!user) res.json({ authError: true });
      req.user = user;
      next();
    });
  });
  //userid와 jwt 일치하는 유저 db에서 가져오기

  //없으면 실패

  //있으면 인증성공
};

module.exports = auth;
