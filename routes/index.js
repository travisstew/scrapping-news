const express = require('express');
const router = express.Router();
const db = require('../model');


router.get('/',(req,res)=>{
 
  // db.Comment.create({
  //   user:'steiiw',
  //   comment:"hello ds"
  // }).then(function (comment) { 
  //    return db.User.findOneAndUpdate({},{$push:{comments:comment._id}},{new:true});
  //  });
  // res.send('hello');

  
    db.Article.find({}).then(function (e) {
        
      res.render('home',{data:e});
  });


});


// router.get('/home',(req,res)=>{

//   db.Article.find({}).then(function (e) {
//      res.render('home',);
//   });
 
// });


module.exports = router;