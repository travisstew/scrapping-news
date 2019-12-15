const axios = require('axios');
const cheerio  = require('cheerio');
const db = require('../model');


function Scrap() {  
axios.get("https://www.newyorker.com/popular").then(response=>{
    
  const $ = cheerio.load(response.data,{ decodeEntities: false});
  var headlines=[];
  var summarys = [];
  var links = [];
 
  const headline  = $('h3.Card__hed___3aD8c')

  headline.each((i,element)=>{
      headlines.push($(element).html());
  });

  const summary = $('p.Card__dek___2E3rB')
  summary.each((i,e)=>{
    summarys.push($(e).html());
    
  });
  const url = $('div.MostPopularRiver__mostPopularRiverContainer___2ajQI')

  url.each((i,e)=>{
    links.push($(e).find('a').attr('href'));
  });
  
  for(let i=0;i < headlines.length;i++){
      db.Article.create({
          Headline: headlines[i],
          Summary: summarys[i],
          URL: links[i]
      }).catch(function (err) {
        if(err) throw err;
        });
  }
});
}

module.exports = Scrap();

  



