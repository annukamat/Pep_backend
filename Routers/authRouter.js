const express = require("express");
const cookieParser=require('cookie-parser')
const userModel = require("../models/userModel");

// USER
const authRouter = express.Router();

authRouter.route("/signup").post(setCreatedAt, signupUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/forgetPassword").get(getforgetPassword).post(forgetUser);

// -------------------------FUNCTIONS----------------------------------

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
    // console.log("user", user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

async function loginUser(req, res) {
  try {
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user && req.body.password == user.password) {
        res.cookie('login', '1234',{httpOnly:true})
        return res.json({
          message: "user logged in succesfully!!!",
        });
      } else {
        return res.json({
          message: "email or password is wrong",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
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
