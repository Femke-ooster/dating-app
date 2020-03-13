const express = require('express');
var slug = require('slug');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
/*env beschikbaarvoor node.js*/
require('dotenv').config();
const app = express();
const port = 8000;

let db;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";
/*const uri = "mongodb+srv://femkeooster:<password>@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";*/

/*verbind met mongodb*/
MongoClient.connect(uri, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
  db.collection('test').insertOne({
    title: 'Hello!'
  })
})



/*geef toegang tot statische map*/
app.use("/static", express.static(__dirname + "/static")); /**/
app.use(bodyParser.urlencoded({extended: true}))
/*Zeg tegen Express dat we de ejs template engine gebruiken*/
app.set("view engine", "ejs");

/*Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn*/
app.set("views", "views");



app.get("/", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.redirect("/home");
});

app.get("/home", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("index.ejs", {title: "Matchie"});
});

app.get("/boost", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("boost.ejs", {title: "Boost"});
});

app.get("/likes", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("likes.ejs", {title: "Likes"});
});

app.get("/messages", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("messages.ejs", {title: "Messages"});
});





app.get("/input", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("test/input.ejs", {title: "Input"});
});

app.get("/output", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("test/output.ejs", {title: "Output"});
});




app.post('/input', addBoost)

function addBoost(req, res){

  db.collection('test').insertOne({
      boost: req.body.boost,
      likes: req.body.likes,
      messages: req.body.messages
  })
  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('output/');
}



//

//
// console.log(req.body);
// app.post('/add-movie', function(req, res){
//   console.log(req.body)
//   res.end()
// })

app.listen(port, () => console.log("Running my NodeJS server at" + port));
