const Appointment = require("../models/Appointment");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const bcrypt = require("bcryptjs");
const { createCustomError } = require("../errors/customError");

//_____________CONTROLLERS______________

//----------------------------------------
//CONTROLLER 1 : To  BOOK APPOINTMENT   using POST '/api/appointment/book/:id'
const bookApp = async (req, res) => {
  //getting the required parameters from req
  const { id: doctorId } = req.params;
  const { id: userId } = req.user;
  const { date, Name, department, Age } = req.body;
  if (!date) {
    createCustomError(400, "Please enter valid date");
  }
  //getting the appointments to limit the number of appointments
  let appointments = await Appointment.find({ doctorId: doctorId, date: date });
  if (appointments.length > 4) {
    createCustomError(400, "Sorry the number of appointments is full");
  }
  //getting the user to get its username
  let user = await User.findOne({ _id: userId });
  //booking Appointment
  let newApp = await Appointment.create({
    doctorId,
    userId,
    date,
    Name,
    Age,
    department,
  });
  res.json({
    success: true,
    msg: "Booked Appointment successfully",
  });
};

//----------------------------------------
//CONTROLLER 2 : To  GET LIST OF DOCTORS   USING GET '/api/appointments/doctors/'
const getdoctors = async (req, res) => {
  const doctors = await User.find({ type: "doctor" });
  res.status(200).json(doctors);
};

//----------------------------------------
//CONTROLLER 3 : To  GET LIST OF APPOINTMENT   using GET '/api/appointment/getappointments'
const getappointments = async (req, res) => {
  //getting the required parameters from required
  const { id: docId } = req.user;
  let appointments = await Appointment.find({ doctorId: docId });
  res.json(appointments);
};

const deleteApp = (req, res) => {
  //getting required parameters
  const { id: docId } = req.user;
};

module.exports = { bookApp, getdoctors, getappointments, deleteApp };
