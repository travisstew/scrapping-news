const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio  = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

//mongoose config 
mongoose.connect('mongodb://localhost/newsScrap', { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false}).then(()=>{
  console.log('mongo connected');
}).catch(err=>{
  console.log(err);
});

app.use('/', require('./routes/index'));

app.listen(PORT,function () { 
  console.log('listening on port ' + PORT);
 });