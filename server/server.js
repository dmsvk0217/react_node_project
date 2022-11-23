const express = require("express");
const app = express();
const path = require("path");
const port = 7777;

//서버 시작
app.listen(port, function () {
  console.log(`listening on ${port}`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "front/build/index.html"));
});
