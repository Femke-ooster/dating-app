/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars:
true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/
/* exported myFunction */

 console.log('hellow :)');

window.onload = function () {
//Get the current page path.
var patharray = location.pathname.split("/views/index.html");
var foldername = patharray[1];
  // If on the root folder of the site, highlight the first link.
  if (foldername == "/views/boost.html") {
  document.getElementById("currentBoost").className = "currentpage";

  } else if (foldername == "/views/likes.html") {
  document.getElementById("currentLikes").className = "currentpage";

  } else if (foldername == "/views/messages.html") {
  document.getElementById("currentMessages").className = "currentpage";
  }
};

//Bron https://www.youtube.com/watch?v=ZE7G_4u4CMY