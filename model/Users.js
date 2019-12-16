const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  user:{
    required: true,
    unique: true,
    type: String
  },
  password:{
    required:true,
    type:String
  },
  name:{
    type:String
  },
  notes:[{
    type: Schema.Types.ObjectId,
    ref:"Notes"
  }]

});

const User = mongoose.model('User',UserSchema);

module.exports = User;