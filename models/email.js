const mongoose = require('mongoose');
const emailSchema = mongoose.Schema({
  
  message:{
    type:String
  }
});

const Email = new mongoose.model('Email',emailSchema);
module.exports = Email