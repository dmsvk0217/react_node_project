const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
  console.log("index.html 라우팅");
  res.sendFile(path.join(__dirname, "./index.html"));
});

require("./routes/routeUser")(app);

const port = 7777;
app.listen(port, function () {
  console.log(`listening on ${port}`);
});
