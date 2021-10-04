const express = require("express");
const app = express();
const PORT = "3000";

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  //   console.log(req);
  console.log(req.hostname);
  console.log(req.path);
  res.send("hello");
  // res.end();
});

app.get("/home", (req, res) => {
  res.sendFile("./views/index.html", {root:__dirname});
  res.end();
});

let userObj = {
  name: "Annu",
};
app.get("/user", (req, res) => {
  res.json(userObj);
});
