<p align="center">
  <h1 align="center">SomeTimes</h1>
  <h3 align="center">Handy news-service to keep track last trends and events of a world</h3>
</p>  

 [![NPM version](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/)  [![](https://img.shields.io/badge/build%20with-Gulp-yellow.svg)](http://gulpjs.com/)
 [![](https://img.shields.io/badge/Angular-v1.5.8-red.svg)](https://angularjs.org/) [![](https://img.shields.io/badge/contacts-Facebook-blue.svg)](https://www.facebook.com/livorni) [![](https://img.shields.io/badge/DataBase-MongoDB-brightgreen.svg)](https://docs.mongodb.com/)

## To run application you must do following steps:  
 1. Download repository to your local machine    
 2. [Install node.js](https://nodejs.org/en/) globally  
 3. In root folder run command-prompt and install 'node-modules' using `$ npm install` command
 4. In `[server]` folder run command-prompt and start server using `$ nodemon server.js`
 5. Open web-browser and go to [localhost](http://localhost:5555/)

## Using Gulp
For using [Gulp](http://gulpjs.com/) for development next packages was installed:  
  * [gulp-babel](https://www.npmjs.com/package/gulp-babel)  
  * [gulp-sass](https://www.npmjs.com/package/gulp-sass)  
  * [gulp-concat](https://www.npmjs.com/package/gulp-concat)  
  * [gulp-uglifyjs](https://www.npmjs.com/package/gulp-uglifyjs)  
  * [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)  
  * [gulp-uglifycss](https://www.npmjs.com/package/gulp-uglifycss)  

## So now you can use gulp tasks
Just print `$ gulp` to build whole project or `$ gulp [task-name]` to run particular task:
  * **babel** - for translate your code into earler standarts of EcmaScript
  * **scripts** - for minifying and concatination your js-code
  * **styles** - for minifying and concatination your css-styles
  * **sass** - for compile your .sass files to .css
  * **clean** - for cache cleaning (cache is used as buffer for image storing)
  * **watch** - for upload any changes in your code
