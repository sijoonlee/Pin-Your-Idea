// ## model
// title;property, content;property, id, date
//
// ## controller
// find id, create, read, write, update, send email
// create, read, delete, update elements,
// DOM -> JS -> model
//
// ## view
// JS -> DOM

//var parentDive = document.getElementByID("default");
//var newParagraph = document.createElement("p");
//var t = document.createTextNode("hello");
//newParagraph.appendChild(t);
//parentDiv.appendChild(newParagraph);


function updateTitle(id, tag, newText){
var parentDiv = document.getElementById(id);
var titleDiv = parentDiv.getElementsByClassName("title")[0];
var newTitle = document.createTextNode(newText);
var newTitleTag = document.createElement(tag);
newTitleTag.appendChild(newTitle);
titleDiv.appendChild(newTitleTag);
}

function updateContent(id, tag, newText){
var parentDiv = document.getElementById(id);
console.log(parentDiv);
var contentDiv = parentDiv.getElementsByClassName("content")[0];
var newContent = document.createTextNode(newText);
var newContentTag = document.createElement(tag);
newContentTag.appendChild(newContent);
contentDiv.appendChild(newContentTag);
}


function buttonClickEvent(id){

var parentDiv = document.getElementById(id);
var btn = parentDiv.getElementsByClassName("button")[0];
btn.addEventListener("click",
	function(){
		updateContent(id, "h2", "aaaa")
	});
}

window.onload = function(){
	buttonClickEvent("default");
}
