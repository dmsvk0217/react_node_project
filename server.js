const express = require('express');
const app = express();

app.listen(8080, function(){
  console.log('listening on 8080');
});

app.use(express.static(path.join(__dirname, 'react_app/build')));

// app.use(express.json());
// var cors = require('cors');
// app.use(cors());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'react_app/build/index.html'));
});

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'react_app/public/index.html'));
// });
