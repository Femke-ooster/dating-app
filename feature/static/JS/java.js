console.log('hellow :)');


// dit zijn de notificatie div'jes
let boostButton = document.querySelector('#noteBoost');
let likesButton = document.querySelector('#noteLikes');
let messagesButton = document.querySelector('#noteMessages');

let boost = document.getElementById('noteBoost');
let likes = document.getElementById('noteLikes');
let messages = document.getElementById('noteMessages');

function hide1() {
	boost.classList.toggle("hidden");
}

boostButton.addEventListener("click", hide1);

function hide2() {
  likes.classList.toggle("hidden");
}

likesButton.addEventListener("click", hide2);

function hide3() {
	messages.classList.toggle("hidden");
}

messagesButton.addEventListener("click", hide3);

//Ik wil eigenlijk dat de divjes van de notificaties verdwijnen wanneer ik op een nav element klik, maar het werkt nog niet
















// DEZE CODE WORDT NOG NIET GEBRUIKT


// dit zijn de nummers in p
// let valueBoost = document.getElementById('valueBoost');
// let valueLikes = document.getElementById('valueLikes');
// let valueMessages = document.getElementById('valueMessages');
//
// let type = [boost, likes, messages];
// let value = [valueBoost, valueLikes, valueMessages];
//
// function notifyBoost {
// 	if(valueBoost > 0){
		// https://stackoverflow.com/questions/9456289/how-to-make-a-div-visible-and-invisible-with-javascript
// 		boost.style.visibility = 'visible';
// 		// https://www.w3schools.com/js/js_htmldom_html.asp
// 		document.getElementById("valueBoost").innerHTML = "1";
// 	} else {
// 		boost.style.visibility = 'hidden'; // hide, but lets the element keep its size
// 	}
// }
