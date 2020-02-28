const express = require('express');
const app = express();
const port = 8000;

/*geef toegang tot statische map*/
app.use("/static", express.static(__dirname + "/static")); /**/

/*Zeg tegen Express dat we de pug template engine gebruiken*/
app.set("view engine", "pug");

/*Zeg tegenb Express dat onze HTMl 'views' in een map views te vinden zijn*/
app.set("views", "views");

app.get("/index", (req, res) => {
  /*method .render beschikbaar gesteld door pug op het response object*/
  res.render("index.pug", {name: "hey", title: "bye"});
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
