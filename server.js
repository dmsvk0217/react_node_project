const express = require('express');
const path = require('path');
const app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eunchong:asd5102@atlascluster.raf1oni.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
}).then(() => console.log('MonogeDB Conneted...'))
  .catch(err => console.log(err));

app.listen(8080, function(){
  console.log('listening on 8080');
});

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'front/build')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

//경로가 서버에 개발되어있지 않은 경우 index.html로 라우팅.
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});