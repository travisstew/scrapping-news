const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const nocache = require('nocache');
const flash = require('connect-flash');


const app = express();
const PORT = process.env.PORT || 3000;

//passport config
require('./config/passport')(passport);


//static files
app.use(express.static('public'))
//mongoose config 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsScrap';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false}).then(()=>{
  console.log('mongo connected');
}).catch(err=>{
  console.log(err);
});


//scrapped database when app is ran
// require('./scrappedArticle/article');



//template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//removes cache from browser
app.use(nocache());

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,  
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));


app.listen(PORT,function () { 
  console.log('listening on port ' + PORT);
 });