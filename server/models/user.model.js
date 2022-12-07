const bcrypt = require("bcrypt");
const connection = require("../config/db");
const secret = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.token = user.token;
};

User.login = (user, id, cb) => {
  // verify check 완료된 상태.
  let data;
  const sqlInsertToken = "UPDATE posts SET token = ? WHERE id = ?";

  data = { loginSuccess: true };
  return cb(null, data);

  // jwt.sign(id, secret, function (err, token) {
  //   if (err) return cb(err, null);
  //   console.log("token ; ", token);

  //   connection.query(
  //     sqlInsertToken,
  //     [token, id],
  //     function (error, results, fields) {
  //       if (error) return cb(error, null);
  //       else {
  //         data = { LoginSuccess: true };
  //         return cb(null, data);
  //       }
  //     }
  //   );
  // });
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

/*
  console.log(results);
  console.log(results[0]);
  [ RowDataPacket { UID: 21, email: 'test', password: 'test' } ]
  [0] RowDataPacket { UID: 21, email: 'test', password: 'test' }
*/
