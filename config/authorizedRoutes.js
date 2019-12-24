module.exports ={
  ensureAuthenticated: function (req,res,next) {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please register if your not a user')
    res.redirect('/user/register');
    },

    
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      req.flash('sucess_msg', "You are Logged In")
      res.redirect('/user/home');      
    }
}