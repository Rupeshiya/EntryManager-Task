const mongoose = require('mongoose');
const keys = require('../config/keys')

//  connect to db 
const connect = function(){
  console.log('uri ', keys.mongoUri);
  mongoose.connect(keys.mongoUri, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log('mongoose connected ');
    })
    .catch((err) => {
      console.log('Error in connecting mongo!!', err);
    });
} 

module.exports = { 
  connect
}