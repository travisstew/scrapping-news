//checks to see if user matches
const LocalStrategy = require('passport-local').Strategy;
//compare the hashed password 
const bcrypt = require('bcryptjs');
const db = require('../model');

module.exports = function (passport) { 
  passport.use(new LocalStrategy({
    usernameField: 'user'
  },(user, password, done)=>{
    //match user 
    db.User.findOne({user:user}).then(newuser=>{
      if(!newuser){
        return done(null,false);
      }

      //before sign in check hashed password for match 
      bcrypt.compare(password,newuser.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, newuser);
        }else{
          return done(null, false);
        }
      }); 
    }).catch(err => console.log(err));
    
  }));

  passport.serializeUser(function (user,done) { 
    done(null, user.id)
  });

  passport.deserializeUser(function (id,done) { 
    db.User.findById(id, function (err,user) { 
      done(err,user);
     });
  });

 };