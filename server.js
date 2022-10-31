const express = require('express');
const path = require('path');
const app = express();
const badyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/key');
const { User } = require('./models/User');

//mongoose 생성 및 연결
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(config.mongoURI, {
  useUnifiedTopology: true,
}).then(() => console.log('MonogeDB Conneted...'))
  .catch(err => console.log(err));

//서버 시작
app.listen(8080, function(){
  console.log('listening on 8080');
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'front/build')));
app.use(bodyParser.urlencoded({extended: true})); //application/X-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

app.post('/regster', function(req, res){
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err});
    else return res.status(200).json({
      success: true,
      userInfo,
    })
  })
});

//경로가 서버에 개발되어있지 않은 경우 index.html로 라우팅.
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});