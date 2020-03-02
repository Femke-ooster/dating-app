const express = require('express');
const app = express();
const port = 8000;

/*geef toegang tot statische map
app.use("/static", express.static(__dirname + "/static"));

Zeg tegen Express dat we de pug template engine gebruiken
app.set("view engine", "pug");

Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn
app.set("views", "views");

app.get("/index", (req, res) => {
  method .render beschikbaar gesteld door pug op het response object
  res.render("index.pug", {name: "hey", title: "bye"});
});*/



/*geef toegang tot statische map*/
app.use("/static", express.static(__dirname + "/static")); /**/

/*Zeg tegen Express dat we de ejs template engine gebruiken*/
app.set("view engine", "ejs");

/*Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn*/
app.set("views", "views");

app.get("/index", function(req, res){
  /*method .render beschikbaar gesteld door pug op het response object*/
  res.render("index.ejs", {title: "hey", message: "bye"});
});



app.get("/", (req, res) => {
  res.write("<p>Hello!<p>");
  res.end();
});

app.get("/about", (req, res) => {
  res.write("<p>Over mij<p>");
  res.end();
});

app.listen(port, () => console.log("Running my NodeJS server at" + port));
