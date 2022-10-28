const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.listen(8080, function(){
  console.log('listening on 8080');
});

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'react_app/build/index.html'));
});

app.get('/dog', function(req, res){
  res.sendFile(path.join(__dirname, 'react_app/build/dog.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'react_app/build/index.html'));
});