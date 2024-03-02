const express = require("express");
const router = express.Router();
const {
  getMyMedHist,
  getMedHist,
  addMedRecord,
} = require("../controllers/medhist.js");
const checkUser = require("../middlewares/checkUser");
const checkDoctor = require("../middlewares/checkDoctor");

//-------ROUTES FOR FETCHING AND MANIPULATING MEDICAL HISTORY --------

//Route no:1
router.route("/mymedicalhistory").get(checkUser, getMyMedHist);
//Route no:2
router.route("/getmedicalhistory/:id").get(checkDoctor, getMedHist);
//Route no:3
router.route("/addmedicalrecord/:id").post(checkDoctor, addMedRecord);

module.exports = router;
