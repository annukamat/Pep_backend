const mongoose = require("mongoose");
const { db_link } = require("../secrets");
const validator = require("email-validator");

mongoose
  .connect(db_link)
  .then(function () {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return validator.validate(this.email);
    },
  },
  createdAt:{
    type:String
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
});

userSchema.pre('save', function(){
  this.confirmPassword=undefined;
})

const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
//   try {
//     let user = {
//       name: "Annu Kamat",
//       age: 56,
//       email: "emmail@gmail.com",
//       password: "mypassword",
//       confirmPassword: "mypassword",
//     };
//     let userObj = await userModel.create(user);
//     console.log(userObj);
//   } catch (err) {
//     console.log(err.message);
//   }
// })();
module.exports=userModel;