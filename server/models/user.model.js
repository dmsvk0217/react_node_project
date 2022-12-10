const bcrypt = require("bcrypt");
const connection = require("./db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = function (user) {
  this.UID = user.UID;
  this.email = user.email;
  this.password = user.password;
  this.token = user.token;
};

User.login = (user, cb) => {
  // verify check 완료된 상태. -> jwt인증구현
  let data = { loginSuccess: true };
  return cb(null, data);
};

User.register = (user, cb) => {
  const saltRounds = 10;
  const PlainPassword = user.password;
  const sqlInsertUser = "insert into user set ?";

  bcrypt.hash(PlainPassword, saltRounds, function (err, hash) {
    // Store in DB.
    user.password = hash;
    connection.query(sqlInsertUser, user, function (err, result, fields) {
      if (err) return cb(err, null);
      data = { registerSuccess: true };
      return cb(null, data);
    });
  });
};

User.generateToken = (user, cb) => {
  console.log("generateToken--------");
  console.log("user : ", user);
  console.log("this user.UID : ", user.UID);
  //jwt 생성하기
  var token = jwt.sign(user.UID.toString(), "secretToken");
  user.token = token;
  console.log("token : ", token);

  var sql = "UPDATE user set token=? where UID=?";

  connection.query(sql, [user.token, user.UID], function (err, result) {
    if (err) return cb(err);
    console.log(result.affectedRows + " record(s) updated");
    return cb(null, result);
  });
};

module.exports = User;
