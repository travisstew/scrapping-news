const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const authorized = require('../config/authorizedRoutes').ensureAuthenticated;
const db = require('../model');
// /user/routes

router.get('/home', authorized ,(req,res)=>{
    db.Article.find({}).then((data)=>{
      res.render('userHome',{data:data});

    })
});
//get register form
router.get('/register', (req,res)=>{
  res.render('register')
});
//post form data from register 
router.post('/register', (req,res)=>{
    const {name,user,password} = req.body;
    let registerErrors =[];
     
    db.User.findOne({user:user}).then(newuser=>{
      if(newuser){
        res.render('register',{
          errors: 'this user exist already'
        })
      }else{
        
       const newUser = new db.User({
         user: user,
         password: password,
         name:name
       });

       bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(newUser.password, salt,(err,hash)=>{
          if(err) throw err;
          //sets the password to be hashed 
          newUser.password = hash;
          //save user 
          newUser.save({}).then(user =>{
            res.redirect('/user/login');
          }).catch(err=>{
            console.log(err);
          });
         });
       })
        
      }
    });
});

//login page
router.get('/login', (req,res)=>{
  res.render('login');
});

//login handle
router.post('/login', (req, res, next)=>{
  passport.authenticate('local',{
    successRedirect:'/user/home',
    failureRedirect: '/user/login',
    // failureFlash:true
  })(req,res,next);
});

//logout route 
router.get('/logout', (req,res)=>{
  //passport middleware logout function 
  req.logOut();
  res.redirect('/');
});

//dashboard 
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
});

module.exports = router;