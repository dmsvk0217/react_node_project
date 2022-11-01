const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  //console.log("save하기전 userSchema.pre()의 this : ", this);
  // userSchema is -> user객체

  if (user.isModified("password")) {
    //비밀번호 암호화 with bcrypt
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//비밀번호 일치 검사
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//유저 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해 토큰 생성 및 저장.
  var token = jwt.sign(user._id.toHexString(), "anything");
  user.token = token;

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//유저 auth체크를 위해, 토큰 복호화후 유저 찾기.
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "anything", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
