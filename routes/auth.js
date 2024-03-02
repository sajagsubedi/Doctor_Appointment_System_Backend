const express = require("express");
const router = express.Router();
const {
  login,
  register,
  create,
  removeUser,
  deleteUser,
  fetchUser,
  profile,
  updateprofile,
  changeprofile,
} = require("../controllers/auth");
const checkAdmin = require("../middlewares/checkAdmin");
const checkUser = require("../middlewares/checkUser");

//-------ROUTES FOR LOGIN AND REGISTRATION OF USER--------

//Route no:1
router.route("/login").post(login);
//Route no:2
router.route("/register").post(register);
//Route no:3
router.route("/create").post(checkAdmin, create);
//Route no:4
router.route("/remove/:id").delete(checkAdmin, removeUser);
//Route no:5
router.route("/delete").delete(checkUser, deleteUser);
//Route no:6
router.route("/getusers").get(checkAdmin, fetchUser);
//Route no:7
router.route("/profile").get(checkUser, profile);
//Router no:8
router.route("/updateprofile").put(checkUser, updateprofile);
//Router no:9
router.route("/changeprofile/:id").put(checkUser, changeprofile);

//-----------EXPORT OF ROUTER------------
module.exports = router;
