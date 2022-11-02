const express = require("express");
const app = express();
const path = require("path");
const port = 7777;

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
app.listen(port, function () {
  console.log(`listening on ${port}`);
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
  // 객체 생성과 동시에 mongoose가 role default 0, _id를 생성한다.
  const user = new User(req.body);

  //console.log("userSchema.pre() 하기전 의 user : ", user);

  //userschema.pre()이용해서 save하기 전에 비밀번호 암호화하기.
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
/*
흐름 정리
1. client 에서 server로 넘어온 정보를 body-parsar를 통해 json으로 변환한다.
2. user 모델?을 불러와서 body로 넘어온 user객체에 해당하는 이메일이 존재하는지 확인한다.
3. 있다면 body user 객체의 비밀번호가 이메일과 맞는지 확인한다.
-->이때 비밀번호를 암호화시켜 저장한 경우 body user의 비밀번호를 암호화한 값과 db의 저장된 암호화된 비밀번호를 비교한다. using bcrypt
4. 비밀번호가 일치한다면 cookie-parsar를 통해 토큰을 생성하고, 이 토큰을 1)쿠키와 2)db안에 존재하는 사용자의 user객체에 저장한다.
-> 나중에 auth, session check를 할 경우 쿠키의 토큰과 db user의 토큰을 비교하여 검사를 한다.
*/
app.post("/api/users/login", function (req, res) {
  //1. 입력된 이메일이 db에 있는지 확인한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //console.log("user객체가 아닌 User.findOne에서의 this 는? : ", this);
    // -> user객체가 아닌 mongoose의 User model

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //2. 이메일에 해당하는 패드워드가 일치하는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(400).send(err);
      if (!isMatch) {
        console.log("ismatch 실패");
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      //3. login 된경우 토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //token을 쿠키에 x_auth라는 이름으로 저장한다.
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

app.get("/api/users/logout", auth, (req, res) => {
  console.log("here is logout");
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~~");
});

//경로가 서버에 개발되어있지 않은 경우 index.html로 라우팅.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "front/build/index.html"));
});
