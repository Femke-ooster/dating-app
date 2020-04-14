/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars:
true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/
/* exported myFunction */

console.log('hellow :)');

var pictures = ['../static/images/plus.png', '../static/images/minus.png']; //closure

window.onload = function () {
//Get the current page path.
//Bron: Alen Simpson, 13 april 2018, https://www.youtube.com/watch?v=ZE7G_4u4CMY
var patharray = location.pathname.split("/");
var foldername = patharray[2];
    
  if (foldername == "boost.html") {
  document.getElementById("currentBoost").className = "currentpage";
      console.log("Currently in Boost");
      getBoost();
      
  } else if (foldername == "likes.html") {
  document.getElementById("currentLikes").className = "currentpage";
      console.log("Currently in Likes");
      getLikes();
      
  } else if (foldername == "messages.html") {
  document.getElementById("currentMessages").className = "currentpage";
      console.log("Currently in Messages");
  }
};

function getBoost() {
    
    console.log("Activating getBoost");
    console.log("Boost page loaded");
    
    document.getElementById("noBoost").style.display = 'none';
    document.getElementById("wantBoost").style.display = 'inline';

        var button = document.getElementById('button');
        button.addEventListener('click', chance);

        function chance() {
            var number = Math.floor((Math.random() * 10) ); //scoping
            if (number < 5) {
                console.log("You got some boosts!");
                document.getElementById('image').src = pictures[0]; //closure
            } else {
                console.log("You lost boosts!");
                document.getElementById('image').src = pictures[1];
            }
    } 
}

function getLikes() {
    
    console.log("Activating getLikes");
    console.log("Likes page loaded");
    
    document.getElementById("hiddenProfile").style.display = 'inline';
        
        function Person(name, age) {
            this.name = name; //context
            this.age = age;
            console.log(name, age);
            
                console.log('hello, my name is ' + this.name + ' and I am ' + this.age + ' years old!'); //closure
                document.getElementById("person1").textContent = 'Hi there! My name is ' + this.name + ' and I am ' + this.age + ' years old.';     
            }
    
    john = new Person("John", 18); //hoisting
    console.log(john);
}