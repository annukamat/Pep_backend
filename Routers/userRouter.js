const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const protectRoute=require("./authHelper");

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

// -------------------------FUNCTIONS----------------------------------

// app.get('/user', getUser);
async function getUsers(req, res) {
  try {
    console.log("getUser called");
    let users = await userModel.find();
    if (users) {
      return res.json(users);
    } else {
      return res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
}

// app.post('/user', createUser)
function createUser(req, res) {
  user = req.body;
  // console.log(user);
  res.send("data has been added successfully!!!");
}

// app.patch('/user', updateUser);
function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}

// app.delete('/user', deleteUser);
function deleteUser(req, res) {
  user = {};
  res.json(user);
}

// app.get('/user/:id', getUserById);
function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params);
}

module.exports = userRouter;
