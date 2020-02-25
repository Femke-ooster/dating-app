const express = require('express');
const app = express();
const port = 8000;

app.use("/static", express.static(__dirname + "/static")); /**/

app.get("/", (req, res) => {
  res.write("<p>Hello!<p>");
  res.end();
});

app.get("/about", (req, res) => {
  res.write("<p>Over mij<p>");
  res.end();
});

app.listen(port, () => console.log("Running my NodeJS server at"));
