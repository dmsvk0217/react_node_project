const express = require("express");
const app = express();
const path = require("path");

//lib
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//obj in file
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

//mongoose 생성 및 연결
mongoose
  .connect(config.mongoURI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("MonogeDB Conneted..."))
  .catch((err) => console.log(err));

//서버 시작
app.listen(8888, function () {
  console.log("listening on 8888");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(bodyParser.urlencoded({ extended: true })); //application/X-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "front/build/index.html"));
});

//회원가입 기능
app.post("/api/users/register", function (req, res) {
  const user = new User(req.body);

  //user.schema.pre()이용해서 save하기 전에 비밀번호 암호화하기.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    else
      return res.status(200).json({
        success: true,
        userInfo,
      });
  });
});

//로그인 기능
app.post("/api/users/login", function (req, res) {
  //1. 입력된 이메일이 db에 있는지 확인한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    console.log("compare 들어가기전.");

    //2. 이메일에 해당하는 패드워드가 일치하는지 확인한다.
    console.log(req.body.password);
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log("comparePassword 안.");
      // console.log(err);
      // console.log(isMatch);
      if (err) return res.status(400).send(err);
      if (!isMatch) {
        console.log("ismatch 실패");
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      console.log("ismatch 성공");

      //3. login 된경우 토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        console.log("cookie 냠냠 ");
        //token을 쿠키에 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
        console.log(req.body);
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 것은 authentication을 통과했다는 것.
  res.status(200).json({
    _id: req.user._id,
    isAmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//경로가 서버에 개발되어있지 않은 경우 index.html로 라우팅.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "front/build/index.html"));
});
