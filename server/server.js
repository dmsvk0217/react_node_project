const express = require("express");
const app = express();
const path = require("path");
const port = 7777;
var mysql = require("mysql");
var cors = require("cors");

//mysql db설정
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "asdf456852",
  database: "nodep",
});
connection.connect();

//서버 시작
app.listen(port, function () {
  console.log(`listening on ${port}`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(cors());

app.get("/", function (req, res) {
  console.log("index.html 라우팅");
  res.sendFile(path.join(__dirname, "./index.html"));
});

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

//connection.end();
//mysql db설정

app.post("/api/register", function (req, res) {
  //Q : USER ID를 넘겨야 하는가?
  console.log("Register request email is ", req.body.email);
  const email = req.body.email;
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
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
      connection.query(sqlInsert, newUser, function (err, result, fields) {
        if (err) throw err;
        data = { registerSuccess: true };
        // result has insertId
        res.json(data);
      });
    }
  });
  //싱글스레드 특성상 콜백함수 안에 res.json을 넣어줘야함!!
  //console.log("[last]data is ", data);
});

app.get("/login", function (req, res) {
  res.send("hello");
});
