const express = require("express");
// client jab server ko data bhejta hai - POST REQ
// client jab data mngva rha server se to - GET REQ
const app = express();
app.use(express.json()); //middleware function
app.use(express.static("public"));

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
app.use("/user", userRouter);
app.use("/auth", authRouter);



app.listen("5000", function () {
  console.log("server listening on port 5000");
});

let user = [];

// GET
app.get("/", (req, res) => {
  res.send("Home Page");
});

// REDIRECTS
app.get("/user-all", (req, res) => {
  res.redirect("/user");
});

app.use((req, res) => {
  res.sendFile("public/404.html", { root: __dirname });
}); //hamesha last me lagana chaye!

//===================================FUNCTIONS==================================
