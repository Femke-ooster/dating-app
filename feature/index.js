var slug = require("slug");
var bodyParser = require("body-parser");
var mongo = require("mongodb");
const express = require("express");
const session = require("express-session");
const app = express();
const port = 8000;
/*env beschikbaarvoor node.js*/
require("dotenv").config();

let db;
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";
/*const uri = "mongodb+srv://femkeooster:<password>@cluster0-lrmlb.azure.mongodb.net/test?retryWrites=true&w=majority";*/

/*verbind met mongodb*/
MongoClient.connect(uri, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
  // db.collection('test').insertOne({
  //   title: 'Hello!'
  // })
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

app.get("/", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.redirect("/home");
});

app.get("/home", function(req, res){

  db.collection("data").findOne(
		{_id: ObjectID(req.params.id)},
		function (err, result){
			if (err) throw err;
			console.log('result:', result);
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("index.ejs", req.session.data);
  });
});

app.get("/boost", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("boost.ejs", req.session.data);
});

app.get("/likes", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("likes.ejs", req.session.data);
});

app.get("/messages", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("messages.ejs", req.session.data);
});

app.get("/input", function(req, res){
  res.render("test/input.ejs");
});

app.get("/update", id);

function id(req, res) {
	db.collection("data").findOne(
		{_id: ObjectID(req.params.id)},
		  function (err, result){
			if (err) throw err;
	console.log("result:", result);
  res.render("test/update.ejs", result);
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

  console.log(req.session.data);
  res.redirect("/home");
  }
};

app.post("/updateNotifications", updateData);

function updateData(req, res){
  db.collection("data").updateOne(
    {_id: ObjectID(req.params.id)},
		{ $set: {
      boost: req.body.updateBoost,
      likes: req.body.updateLikes,
      messages: req.body.updateMessages} },
		(err)=>{
			if (err) throw err;
			res.redirect("/home", req.params.id);
		});
};

// //INPUT
//
// app.get("/input", inputData);
// //data binnenkrijgen via dom in html
// function inputData(req, res){
//   db.collection('notification').insertOne(
//   req.session.note = {
//     boost: req.body.inBoost,                    // opgeslagen object
//     likes: req.body.inLikes,
//     messages: req.body.inMessages
//   })
//   function error(err, result){                  // callback
//       if(err) throw err;
//       res.status(200).send('data inserted')
//   }
//   console.log(req.session.note);
//   res.render("test/input.ejs");  // render input.ejs pagina
// };
//
// //UPDATE
//
// app.get("/update", update);
// //data veranderen in html
// function update(req, res){
//   db.collection('notification').findOne({
//     boost: req.body.inBoost,                    // opgeslagen object
//     likes: req.body.inLikes,
//     messages: req.body.inMessages
//   },
//   function error(err, result){                  // callback
//       if(err) throw err;
//       const id = result._id;
//       updatePage(id, () => {
//         req.session.note = true;
//         res.status(200).send('data updated');
//       })
//   })
//   console.log(req.session.note);
//   res.render("test/update.ejs", req.session.note);  // render input.ejs pagina
// }
//
// //POST
//
// app.post('/inputNotifications', addBoost)
//
// function addBoost(req, res){
//
//     req.session.note = {
//       boost: req.body.inBoost,
//       likes: req.body.inLikes,
//       messages: req.body.inMessages
//   },
//   console.log(req.session.note); //Laat in de terminal de gegevens zien.
//   res.render('index.ejs', req.session.note)
// };
//
// //UPDATE
//
// app.post('/updateNotifications', updatePage)
//
// function updatePage(id, callback){
//   db.collection('update').updateOne(
//     {"_id": ObjectID(req.body._id)},
//     {$set:{
//       boost: req.body.updateBoost,                    // opgeslagen object
//       likes: req.body.updateLikes,
//       messages: req.body.updateMessages
//     }},
//     function error(err, result){                  // callback
//         if(err) throw err;
//         res.redirect("/home");
//   })
// }


app.listen(port, () => console.log("Running my NodeJS server at" + port));
