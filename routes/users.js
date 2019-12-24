const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const authorized = require('../config/authorizedRoutes').ensureAuthenticated;

const db = require('../model');
// /user/routes
//
router.get('/home' , authorized ,(req,res)=>{
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
            req.flash('success_msg', "you are now registered")
            res.redirect('/user/login');
          }).catch(err=>{
            console.log(err);
          });
         });
       });        
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
    failureFlash:true
  })(req,res,next);
});

//logout route 
router.get('/logout', (req,res)=>{
  //passport middleware logout function 
  req.logOut();
  req.flash('success_msg', 'you are logged out')
  res.redirect('/');
});

//dashboard 
router.get('/dashboard',authorized, (req,res)=>{
    db.User.findById(`${req.user._id}`).populate('notes').then(function (notes) {
              res.render('dashboard', {data:notes})
      });
});

//post saved article
router.post('/dashboard', (req,res)=>{
  res.render('dashboard');
   db.Article.findById(`${req.body.id}`).then(function (article) {
   
          return article;
     }).then(function (article) {
          db.Notes.create({
              headline:article.Headline,
              summary: article.Summary,
              URL: article.URL,
              user:req.user._id,
              note: "effe"

          }).then(function (e) { 
              return db.User.findByIdAndUpdate(`${req.user._id}`,{$push:{ notes: e._id}},{new:true});
          });
        });   
  });
//update note route 
  router.put('/note/:id', (req,res)=>{
        console.log(req.params.id);
        console.log(req.body.note);
        
      db.Notes.findByIdAndUpdate(`${req.params.id}`,{note: req.body.note} ).then(function () {
          // res.render('dashboard');
        });
      res.render('dashboard');
  });

  router.delete('/delete', (req,res)=>{
    console.log(req.body.id);
    db.Notes.findByIdAndDelete(`${req.body.id}`).then(function () {

      });
      res.render('dashboard');
  });


  

module.exports = router;