const express=require('express')

let flag = false;
function protectRoute(req, res, next) {
  try {
    if (req.cookies) {
      if (req.cookies.login == "1234") {
        next();
      } else {
        res.json({
          message: "not authorized",
        });
      }
    } else {
      res.json({
        message: "operation not allowed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports=protectRoute;