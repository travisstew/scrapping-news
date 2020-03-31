# scrapping-news

## Summary 

This is a web app that scraps articles from "www.newYorker.com".  When the page loads it scraps articles from the newYorker under the latest headline and saves it to the database. The app scraps the title, article link, and the summary of the articles. You can save articles to your dashboard after registering to the web site.

- Preview https://headline-scrap.herokuapp.com/

![alt text](public/images/newsgif.gif)

## Installation

- clone repo
- install: `npm install --save`
- create .gitignore file and add node_modules inside 
- inside routes folder, `index.js` - add the website you want to scrap inside axios get request `axios.get("https://www.websiteofyourchoice")`


## License 

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Deployment 
 - Heroku 
## Authors 
Travis Stewart 
## License & copyright

Licensed under the [MIT License](LICENSE).


