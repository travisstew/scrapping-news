const express = require('express');
const router = express.Router();

const db = require('../model');
// /user/routes

router.get('/home',(req,res)=>{
    db.Article.find({}).then((data)=>{
      res.render('userHome',{data:data});

    })

});


module.exports = router;