const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio  = require('cheerio');
const db = require('../model');


router.get('/',(req,res)=>{
  // Article.create({
  //   Headline:'travis',
  //   Summary: 'stew',
  //   URL: 'www.yahoo.com'
  // });

  // db.User.create({
  //   user:'steiiew',
  //   password:'dflja'
  // });

  db.Comment.create({
    user:'steiiw',
    comment:"hello ds"
  }).then(function (comment) { 
     return db.User.findOneAndUpdate({},{$push:{comments:comment._id}},{new:true});
   });



  res.send('hello');
});



module.exports = router;