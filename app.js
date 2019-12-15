const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

//static files
app.use(express.static('public'))
//mongoose config 
mongoose.connect('mongodb://localhost/newsScrap', { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false}).then(()=>{
  console.log('mongo connected');
}).catch(err=>{
  console.log(err);
});


//scrapped database when app is ran
require('./scrappedArticle/article');



//template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));


app.listen(PORT,function () { 
  console.log('listening on port ' + PORT);
 });