const express = require("express");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/:id").get(getUserById);

//GET
// app.get('/user', getUser);
async function getUser(req, res) {
  res.json(user);
}

// POST
// app.post('/user', createUser)
function createUser(req, res) {
  user = req.body;
  // console.log(user);
  res.send("data has been added successfully!!!");
}

// UPDATE
// app.patch('/user', updateUser);
function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}

// DELETE
// app.delete('/user', deleteUser);
function deleteUser(req, res) {
  user = {};
  res.json(user);
}

// PARAM ROUTE
// app.get('/user/:id', getUserById);
function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params);
}

module.exports = userRouter;
