const user = require("../models/user.model");
const connection = require("../config/db");
const bcrypt = require("bcrypt");

checkEmail = (req, res, next) => {
  const email = user.email;
  let data;
  const sqlGetByEmail = "select * from user where email = ?";

  connection.query(sqlGetByEmail, [email], function (err, results, fields) {
    if (err)
      res.status(500).send({
        message: "Some error occured while checkDuplicateUsernameOrEmail",
      });

    if (results[0]) {
      // 이미 존재하는 이메일.
      data = { ExistEmail: true };
      res.send(data);
    } else {
      next();
    }
  });
};

checkEmailAndPassword = (req, res, next) => {
  const email = req.body.email;
  const sqlGetByEmail = "select * from user where email = ?";
  const plainPassword = req.body.password;
  let data;

  connection.query(sqlGetByEmail, [email], function (err, results, fields) {
    console.log("🚀 ~ file: verifySign.js:33 ~ results", results[0]);
    if (err)
      res.status(500).send({
        message: "Some error occured while checkDuplicateUsernameOrEmail",
      });

    if (!results[0]) {
      // 존재하지 않는 이메일.
      data = { notExistEmail: true };
      res.send(data);
    } else {
      console.log("result[0]: ", results[0]);
      const hash = results[0].password;
      bcrypt.compare(plainPassword, hash).then(function (result) {
        console.log("🚀 ~ file: verifySign.js:47 ~ result", result);
        if (result) {
          console.log("1111111111");
          req.uid = results[0].UID;
          console.log("22222222");
          next();
        } else {
          //비밀번호 불일치.
          console.log("비밀번호 불일치");
          data = { worngPassword: true };
          res.send(data);
        }
      });
    }
  });
};

const verifyLogin = {
  checkEmail: checkEmail,
  checkEmailAndPassword: checkEmailAndPassword,
};

module.exports = verifyLogin;
