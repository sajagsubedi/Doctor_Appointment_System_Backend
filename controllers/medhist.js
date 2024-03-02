const MedHist = require("../models/MedicalHistory");
const User = require("../models/User");
const { createCustomError } = require("../errors/customError");

//_____________CONTROLLERS______________

//----------------------------------------
//CONTROLLER 1 : To  FETCH MEDICAL HISTORY OF PATAIENT BY PATIENT USING GET '/api/medicalhistory/mymedicalhistory'
const getMyMedHist = async (req, res) => {
  //getting the required params
  const { id: userId } = req.user;

  const FoundMedHistory = await MedHist.find({ patientId: userId });
  res.status(200).json({
    success: true,
    medicalhistory: FoundMedHistory,
  });
};

//----------------------------------------
//CONTROLLER 2 : To  FETCH MEDICAL HISTORY OF PATAIENT BY DOCTOR USING GET '/api/medicalhistory/getmedicalhistory/:id'
const getMedHist = async (req, res) => {
  //getting required params
  const { id: patientId } = req.params;

  const FoundMedHistory = await MedHist.find({ patientId: patientId });
  res.json({ success: true, MedicalHistory: FoundMedHistory });
};

//----------------------------------------
//CONTROLLER 3: To  ADD MEDICAL RECORD OF PATAIENT BY DOCTOR USING POSt '/api/medicalhistory/addmedicalrecord/:id'

const addMedRecord = async (req, res) => {
  //getting required params
  const { id: patientId } = req.params;
  const { id: doctorId } = req.user;
  const { MedicalCondition, Medications, MedicalDescription } = req.body;

  const newMedicalRecord = await MedHist.create({ patientId });
  res.json({ success: true, msg: "Added in  Medical Record successfully" });
};

module.exports = { getMyMedHist, getMedHist, addMedRecord };
