var slug = require('slug');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
const express = require('express');
const session = require('express-session');
const app = express();
const port = 8000;
/*env beschikbaarvoor node.js*/
require('dotenv').config();

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
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("index.ejs", req.session.note);
});

app.get("/boost", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("boost.ejs", req.session.note);
});

app.get("/likes", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("likes.ejs", req.session.note);
});

app.get("/messages", function(req, res){
  /*method .render beschikbaar gesteld door ejs op het response object*/
  res.render("messages.ejs", req.session.note);
});

app.get("/input", inputData);
//data binnenkrijgen via dom in html
function inputData(req, res){
  db.collection('notification').insertOne({
    boost: req.body.inBoost,                    // opgeslagen object
    likes: req.body.inLikes,
    messages: req.body.inMessages
  })
  function error(err, result){                  // callback
      if(err) throw err;
      res.status(200).send('data inserted')
  }
  console.log(req.session.note);
  res.render("test/input.ejs", req.session.note);  // render input.ejs pagina
};



// app.get("/update", inputData);
//
// function inputData(req, res){
//   db.collection('notification').findOne({
//     boost: req.body.inBoost,                    // opgeslagen object
//     likes: req.body.inLikes,
//     messages: req.body.inMessages
//   })
//   function error(err, result){                  // callback
//       if(err) throw err;
//       res.status(200).send('data inserted')
//   }
//   console.log(req.session.note);
//   res.render("test/update.ejs", req.session.note);  // render input.ejs pagina
// };

app.get("/update", update);
//data veranderen in html
function update(req, res){
  db.collection('notification').findOne({
    boost: req.body.inBoost,                    // opgeslagen object
    likes: req.body.inLikes,
    messages: req.body.inMessages
  },
  function error(err, result){                  // callback
      if(err) throw err;
      const id = result._id;

      updateData(id, () => {
        req.session.hasUdpdated = true;
        res.status(200).send('data updated');
      });
        console.log(req.session.note);
        res.render("test/update.ejs", req.session.note);  // render input.ejs pagina
  });
}

function updateData(id, callback){
  db.collection('update').updateOne(
    {_id: ObjectID(id)},
    {$set:{
      boost: req.body.inBoost,                    // opgeslagen object
      likes: req.body.inLikes,
      messages: req.body.inMessages
    }},
    function error(err, result){                  // callback
        if(err) throw err;

        callback()
  })
}

//POST

app.post('/inputNotifications', addBoost)

function addBoost(req, res){

    req.session.note = {
      boost: req.body.inBoost,
      likes: req.body.inLikes,
      messages: req.body.inMessages
  };
  console.log(req.session.note); //Laat in de terminal de gegevens zien.
  res.redirect('home')
};

app.listen(port, () => console.log("Running my NodeJS server at" + port));
