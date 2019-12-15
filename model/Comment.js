const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note:{
      type:String,
    },
    Date:{
      type:Date,
      default:Date.now
    },
    headline:String,
    summary:String,
    URL: String
});

const Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;

