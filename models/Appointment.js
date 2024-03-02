const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  Name:String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userId",
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "doctorId",
  },
  Age:Number,
  department:String,
  date: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
