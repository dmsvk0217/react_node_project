const express = require('express');
const app = express();

app.listen(8080, function(){
  console.log('listening on 8080');
});

app.use(express.static(path.join(__dirname, '../front/build')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../front/build/index.html'));
});