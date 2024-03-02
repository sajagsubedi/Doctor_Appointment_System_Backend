const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedHistSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "doctorId",
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "patientId",
  },
  MedicalDescription: String,
  MedicalCondition: String,
  Medications: String,
  timestamp: {
    default: new Date(),
    type:Date
  },
});
module.exports = mongoose.model("MedicalHistory", MedHistSchema);
