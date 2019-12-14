const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment:{
      type:String,
    },
    Date:{
      type:Date,
      default:Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

