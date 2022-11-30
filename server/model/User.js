const bcrypt = require("bcrypt");
const connection = require("../model/DB");

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

User.login = (user, cb) => {
  const email = user.email;
  const password = user.password;
  let data;
  const sqlGetByEmail = "select * from user where email = ?";

  connection.query(sqlGetByEmail, [email], function (err, results, fields) {
    if (err) return cb(err, null);
    if (!results[0]) {
      data = { notExistEmail: true };
      return cb(null, data);
    } else {
      const hash = results[0].password;
      const plainPassword = password;
      bcrypt.compare(plainPassword, hash).then(function (result) {
        if (result) data = { loginSuccess: true };
        else data = { worngPassword: true };
        return cb(null, data);
      });
    }
  });
};
/*
  console.log(results);
  console.log(results[0]);
  [ RowDataPacket { UID: 21, email: 'test', password: 'test' } ]
  [0] RowDataPacket { UID: 21, email: 'test', password: 'test' }
*/

User.register = (user, cb) => {
  const email = user.email;
  const password = user.password;
  const saltRounds = 10;
  let data;

  const sqlGetByEmail = "select * from user where email = ? ";
  const sqlInsertUser = "insert into user set ?";

  connection.query(sqlGetByEmail, [email], function (err, result, fields) {
    if (err) return cb(err, null);
    if (result[0]) {
      data = { registerSuccess: false, existUser: true };
      return cb(null, data);
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) return cb(err, null);
        user.password = hash;
        connection.query(sqlInsertUser, user, function (err, result, fields) {
          if (err) return cb(err, null);
          data = { registerSuccess: true };
          return cb(null, data);
        });
      });
    }
  });
};

module.exports = User;
