//model
(function(window){
	'use strict'

	function Model(notes) {
		this.notes = notes;
	};

	Model.prototype.addNote = function (note){
		this.notes.push(note);
	}

	Model.prototype.findNote = function (note){
		for ( var i in this.notes) {
			if ( this.notes[i].id === note.id ) return this.notes[i];
		}
		return false;
	}
	Model.prototype.updateNote = function (note){
		if ( this.findNote(note) === false ) return false;
		this.findNote(note).title = note.title;
		this.findNote(note).content = note.content;
	}
	Model.prototype.deleteNote = function (note){
		this.notes.splice(this.notes.indexOf(this.findNote(note)),1);
	}

/* test code
var notes = new Array();
notes = [ {id: "default", title: "Your First Note", content: "Write Something!"} ];
var myModel = new app.Model(notes);
var noteA = {id:"default", title:"new title", content:"new new"};
var noteB = {id:"abc", title:"abc title", content:"abc"};
myModel.addNote(noteB);
console.log(myModel.notes)
console.log(myModel.findNote(noteB));
myModel.updateNote(noteA);
console.log(myModel.notes)
myModel.deleteNote(noteB);
console.log(myModel.notes)
*/
	//export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);

/*
//controller
(function(window){
	'use strict'
	Controller = function(notes) {
			this.notes = notes;
	};
	Controller.prototype.addNote = function (note){
		this.notes.set(note.id, note.obj);
	}
	Controller.prototype.updateNote = function (id,note){
	}
	Controller.prototype.deleteNote = function (id){
	}
	Controller.prototype.readNote = function (id){
	}
	Controller.prototype.writeNote = function (id){
	}
	//export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);

//view
(function(window){
	'use strict'
		//export to window
		window.app = window.app || {};
		window.app.View = View;
})(window);

//app
(function(window){
	'use strict'
	window.model = new app.Model();
	window.view = new app.View();
	window.controller = new app.Controller(model, view);

})(window);
*/
