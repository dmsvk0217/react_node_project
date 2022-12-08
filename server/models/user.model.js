const bcrypt = require("bcrypt");
const connection = require("./db");

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.token = user.token;
};

User.login = (user, id, cb) => {
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

module.exports = User;
