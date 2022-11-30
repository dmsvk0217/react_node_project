const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

//mysql db설정
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "asdf456852",
  database: "nodep",
});
connection.connect();

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(cors());

app.get("/", function (req, res) {
  console.log("index.html 라우팅");
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/api/register", function (req, res) {
  //Q : USER ID를 넘겨야 하는가?
  console.log("Register request email is ", req.body.email);
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;
  var data;

  const sqlSelect = "select * from user where email = ? ";
  const sqlInsert = "insert into user set ?";

  connection.query(sqlSelect, [email], function (err, result, fields) {
    if (err) throw err;
    console.log("select result is ", result);
    if (result[0]) {
      // 이미존재하는 유저.
      console.log("이미존재하는 유저입니다.");
      data = { registerSuccess: false, existUser: true };
      res.json(data);
    } else {
      console.log("유저를 생성합니다.");

      bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (err) throw err;

        const newUser = {
          email: req.body.email,
          password: hash,
        };

        connection.query(sqlInsert, newUser, function (err, result, fields) {
          if (err) throw err;
          data = { registerSuccess: true };
          // result has insertId
          res.json(data);
        });
      });
    }
  });
  //싱글스레드 특성상 콜백함수 안에 res.json을 넣어줘야함!!
  //console.log("[last]data is ", data);
});

app.post("/api/login", function (req, res) {
  /**
   로그인 프로세스
   1. 이메일과 비밀번호를 가져온다.
   2. 이메일이 존재하는지 확인한다 없다면 "이메일에 해당하는 계정이 존재하지 않습니다."
   3. 이메일이 존재한다면 비밀번호가 일치하는지 확인한다. 틀리다면 "비밀번호가 틀렸습니다."
   4. 로그인 성공 메세지보내기 loginSuccess:true
   */

  const email = req.body.email;
  let data;
  const sqlGetByEmail = "select * from user where email = ?";

  connection.query(sqlGetByEmail, [email], function (err, results, fields) {
    if (err) throw err;
    if (!results[0]) {
      data = { notExistEmail: true };
    } else {
      const hash = results[0].password;
      const plainPassword = req.body.password;
      // console.log("hash : ", hash);
      // console.log("plainPassword : ", plainPassword);
      bcrypt.compare(plainPassword, hash).then(function (result) {
        //console.log("bcrpyt compare result : ", result);
        if (result) {
          data = { loginSuccess: true };
        } else {
          data = { worngPassword: true };
        }
        res.json(data);
      });
    }
    /*
      console.log(results);
      console.log(results[0]);
      [ RowDataPacket { UID: 21, email: 'test', password: 'test' } ]
      [0] RowDataPacket { UID: 21, email: 'test', password: 'test' }
    */
  });
});

//서버 시작
const port = 7777;

app.listen(port, function () {
  console.log(`listening on ${port}`);
});
