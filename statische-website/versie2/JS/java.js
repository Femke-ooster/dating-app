/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars:
true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/
/* exported myFunction */

/*CODE voor hamburger menu van Carlijn Bruin*/
/*
var zoekbutton = document.querySelector(".burger");
var zoekveld = document.querySelector(".linkjes");

function show() {
	zoekveld.classList.toggle("show-search");
}

zoekbutton.addEventListener("click", show);
*/

console.log('hellow :)');

var boost = document.querySelector("#boost");
var boostActive = document.querySelector("#boostActive");

function show() {
	boostActive.classList.toggle("active");
}

boost.addEventListener("click", show);
