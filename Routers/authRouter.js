const express = require("express");
const userModel = require("../models/userModel");

// USER
const authRouter = express.Router();
authRouter.route("/signup")
.post(setCreatedAt, signupUser);

authRouter.route("/forgetPassword")
.get(getforgetPassword)
.post(forgetUser);

function setCreatedAt(req, res, next) {
  //if req.body will empty throw error
  let obj = req.body;
  // keys ka array -> length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res.status(400).json({ message: "cannot create user for length 0" });
  }
  req.body.createdAt = new Date().toISOString();
  next(); //sabse pehle setCreatedat chlega then signup
}

async function signupUser(req, res) {
  // let{email,name,password} = req.body;  //destructuring
  // user.push({ email,name,password });
  //push all the data in mongodb
  try {
    let userObj = req.body;
    let user = await userModel.create(userObj);
    console.log("user", user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function getforgetPassword(req, res) {
  res.sendFile("./public/forgetPassword.html", { root: __dirname });
}
function forgetUser(req, res) {
  let email = req.body;
  console.log("email", email);
  res.json(email);
}

module.exports = authRouter;
