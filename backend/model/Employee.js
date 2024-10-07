const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  f_Id: {
    type: String,
    required: true,
    unique: true,
  },
  f_Image: {
    type: String,
    required: false,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
  },
  f_Mobile: {
    type: String,
    required: true,
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  f_Course: {
    type: String,
    required: true,
  },
  f_Createdate: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("t_Employee", userSchema);

module.exports = Employee;
