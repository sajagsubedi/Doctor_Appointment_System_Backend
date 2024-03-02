const express = require("express");
const router = express.Router();
const {
  bookApp,
  deleteApp,
  getdoctors,
  getappointments,
} = require("../controllers/appointment.js");
const checkUser = require("../middlewares/checkUser");
const checkDoctor = require("../middlewares/checkDoctor");

//-------ROUTES FOR MANIPULATNG APPOINTMENTS AND DOCTOR--------

//Route no:1
router.route("/book/:id").post(checkUser, bookApp);
//Route no:2
router.route("/delete/:id").post(checkUser, deleteApp);
//Route no:3
router.route("/doctors").get(getdoctors);
//Router no:4
router.route("/getappointments").get(checkDoctor, getappointments);
//-----------EXPORT OF ROUTER------------
module.exports = router;
