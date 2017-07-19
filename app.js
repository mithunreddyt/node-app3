//Grabing the packages/variables we need(that's we installed using npm)
//========================================================
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

//Configure the app
//===============================================
//telling node where to look for the site resources
app.use(express.static(__dirname + '/public'));

//set the view engine to ejs
app.set('view engine', 'ejs');

//configuring instagram app with our access token
ig.use({
  //got this access token from: http;//instagram.pixelunion.net/
  access_token: 'MY_ACCESS_TOKEN',
});

//setting the routes
//===========================
//home page route - our profle's images
app.get('/', function(req,res){

  //use the instagram package to get our profile's media
  ig.user_self_media_recent(function(err, medias, pagination, remaining, limit){
  //render the home page and pass in our profile's images
  res.render('pages/index',{ grams: medias });
  });
});

//Starting the server
//=======================================
app.listen(8081);
console.log('App started Look at http://localhost:8081');
