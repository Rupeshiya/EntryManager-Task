const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInOutSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
      type: String,
      // required: true
    },
  email: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  checkIn: {
    type: String,
    // required: true
  },
  checkOut: {
    type: String
  },
  date:{
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('checkInOut', checkInOutSchema);