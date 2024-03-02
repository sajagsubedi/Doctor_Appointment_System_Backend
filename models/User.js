const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  password: String,
  email: String,
  type:String
});
module.exports = mongoose.model("User", UserSchema);