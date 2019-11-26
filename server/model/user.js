const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new  Schema({
  username:{
    type: String,
    required: true,
    unique: false
  },
  email:{
    type: String,
    required: true,
    unique: false
  },
  password:{
    type: String,
    required: true,
    // minlength: 6
  },
  name:{
    type: String,
    require: true,
    // minlength: 3,
    unique: false
  },
  checksInInfo :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkInOut'
  }
})

module.exports = mongoose.model('Users',userSchema);
// created for using this in our function 
const Users = mongoose.model('Users',userSchema);