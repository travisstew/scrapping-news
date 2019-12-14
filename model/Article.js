const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const Articles = new Schema({
  Headline:String,
  Summary: String,
  URL: String
});

const Article = mongoose.model('Article', Articles);
module.exports = Article;