var slug = require("slug");
var bodyParser = require("body-parser");
var mongo = require("mongodb");
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
/*env beschikbaarvoor node.js*/
require("dotenv").config();

let db;
const { MongoClient, ObjectID } = require('mongodb');
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";
/*const uri = "mongodb+srv://femkeooster:<password>@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";*/

/*verbind met mongodb*/
MongoClient.connect(uri, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
});

/*geef toegang tot statische map*/
app.use("/static", express.static(__dirname + "/static")); /**/
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET
}));
/*Zeg tegen Express dat we de ejs template engine gebruiken*/
app.set("view engine", "ejs");
/*Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn*/
app.set("views", "views");

//GET

app.get("/home", function(req, res){
  res.render("index.ejs");
});

app.get("/home/:id", function(req, res){
  db.collection("data").findOne( // zoekt id in de url
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("index.ejs", result);
  });
});

app.get("/boost/:id", function(req, res){
  db.collection("data").findOne( // zoekt id in de url
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("boost.ejs", result);
  });
});

app.get("/likes/:id", function(req, res){
  db.collection("data").findOne( // zoekt id in de url
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("likes.ejs", result);
  });
});

app.get("/messages/:id", function(req, res){
  db.collection("data").findOne( // zoekt id in de url
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("messages.ejs", result);
  });
});

app.get("/input", function(req, res){
  res.render("test/input.ejs");
});

app.get("/update/:id", findId);

function findId(req, res) {
	db.collection("data").findOne( //
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
  res.render("test/update.ejs", result); //result wordt doorgestuurd naar update.ejs zodat je de data kan gebruiken
  });
};

//post

app.post("/inputNotifications", addData);

function addData(req, res){

  req.session.data = {
    boost: req.body.boost,
    likes: req.body.likes,
    messages: req.body.messages
  };
  db.collection('data').insertOne(req.session.data, insert);
	function insert (err, result) {
		if (err) throw err;
		req.session.data._id = result.insertedId;

  console.log("Input:", req.session.data);
  res.redirect("/home/" + req.session.data._id);
  }
};

app.post("/updateNotifications", updateData);

function updateData(req, res){
  db.collection("data").updateOne(
    {_id: ObjectID(req.body._id)}, //niks uit url, maar uit body: .get = params , .post = body
		{ $set: {
      boost: req.body.updateBoost,
      likes: req.body.updateLikes,
      messages: req.body.updateMessages} },
		(err)=>{
			if (err) throw err;

      console.log("Output:", req.session.data);
			res.redirect("/home/" + req.body._id);
		});
};

app.listen(port, () => console.log("Running at localhost:" + port));
