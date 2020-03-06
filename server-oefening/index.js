const express = require('express');
var slug = require('slug')
var bodyParser = require('body-parser')
const app = express();
const port = 8000;


/*geef toegang tot statische map*/
app.use("/static", express.static(__dirname + "/static")); /**/


/*Zeg tegen Express dat we de ejs template engine gebruiken*/
app.set("view engine", "ejs");


/*Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn*/
app.set("views", "views");


app.get("/index", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("index.ejs", {title: "hey", message: "bye"});
});




app.get("/", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("add.ejs");
});



app.post('/add-movie', function(req, res){
  console.log(req.body)
  res.end()
})




app.listen(port, () => console.log("Running my NodeJS server at" + port));
