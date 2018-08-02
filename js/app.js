
(function(window){
	'use strict' // IIFE + "use strict" prevent scope problems
	class Store {
	    constructor(pinBoard){
			var defaultPinBoard = [ {id: "memo-default", title: "", content: ""} ];
	        this.pinBoard = pinBoard || defaultPinBoard;
	    }
	}
	Store.prototype.savePinBoard = function (pinBoard){
			this.pinBoard = pinBoard;
	}
	// export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
//MODEL
(function(window){
	'use strict'
	//Array Clone
	//this.pinBoard = Array.from(pinBoard, x=>x);
	//this.pinBoard = pinBoard.slice(0);
	//Object Clone
	//var x = {myProp: "value"}; var y = Object.assigx);
	class Model {
		constructor(pinBoard) {
		    this.pinBoard = []; // new Array container
		    for (var i in pinBoard){
		        this.pinBoard[i] = Object.assign({}, pinBoard[i]);
		    } // Clone Object
		}
	}
	Model.prototype.addMemo = function (memo){
		this.pinBoard.push(memo);
	}
	Model.prototype.findMemo = function (id){
		for ( var i in this.pinBoard) {
			if ( this.pinBoard[i].id === id ) return this.pinBoard[i];
		}
		return false;
	}
	Model.prototype.deleteMemo = function (id){
		this.pinBoard.splice(this.pinBoard.indexOf(this.findMemo(id)),1);
	}
	Model.prototype.updateMemo = function (type, id, txt){
	    switch(type){
	        case "title":
	            for( var i in this.pinBoard ){
	                if(id == this.pinBoard[i].id) this.pinBoard[i].title = txt;
	            }
	            break;
	        case "content":
	            for( var i in this.pinBoard ){
	                if(id == this.pinBoard[i].id) this.pinBoard[i].content = txt;
	            }
	            break;
	    }
	}
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
//VIEW
(function(window){
	'use strict'
	class View {
		constructor() {}
	}

	View.prototype.createMemoElement = function(givenId, newId){
		//create new memo node after given Id
		var newNode = document.createElement("div");
		newNode.setAttribute("class", "memo");
		newNode.setAttribute("id", newId);
		newNode.innerHTML =
			"<div contentEditable = true class = \"title\">New Post</div><div contentEditable = true class = \"content\">Write Something!</div><input class=\"hide\" type=\"button\" value=\"hide\"><input class=\"add\" type=\"button\" value=\"add\"></div><input class=\"delete\" type=\"button\" value=\"delete\">";
		if (givenId == null) {
			var givenNode = document.getElementsByClassName("pinBoard")[0];
			givenNode.appendChild(newNode);
		}
		else {
			var givenNode = document.getElementById(givenId);
			givenNode.parentNode.insertBefore(newNode, givenNode.nextSibling);
		}
		return newNode;
	}
	View.prototype.deleteMemo = function (targetNode){
		targetNode.parentNode.removeChild(targetNode);
	}
	View.prototype.toggleHide = function (memoNode){
    	var title = memoNode.getElementsByClassName("title")[0];
    	var content = memoNode.getElementsByClassName("content")[0];
    	if(content.style.display == 'none'){
        	content.style.display = 'block';
    	} else {
        	content.style.display = 'none';
    	}

	}
	//Export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);
//CONTROLLER
(function(window){
	'use strict'
	class Controller {
	    constructor(model, view, store) {
	        this.model = model;
	        this.view = view;
	        this.store = store;
			var newNode = this.view.createMemoElement(null,"memo-default");
			this.bindEvent(newNode);
	    }
	}
	Controller.prototype.bindEvent = function (newNode){
		var id = newNode.id;
	    var titleNode = newNode.getElementsByClassName("title")[0];
	    var contentNode = newNode.getElementsByClassName("content")[0];
	    var hideButtonNode = newNode.getElementsByClassName("hide")[0];
	    var addButtonNode = newNode.getElementsByClassName("add")[0];
		var deleteButtonNode = newNode.getElementsByClassName("delete")[0];
	    titleNode.addEventListener("input", this.updateMemo.bind(this, "title", id, titleNode));
	    contentNode.addEventListener("input", this.updateMemo.bind(this, "content", id, contentNode));
	    deleteButtonNode.addEventListener("click", this.deleteMemo.bind(this, newNode));
	    addButtonNode.addEventListener("click", this.addMemo.bind(this, id));
	    hideButtonNode.addEventListener("click", this.view.toggleHide.bind(this, newNode));
	}

	Controller.prototype.generateId = function(){
		var id = "memo-" + Date.now() + Math.floor(Math.random() * 1000);
		for (var i in this.model.pinBoard){
			if ( this.model.pinBoard[i] == id ){
				this.generateID();
			}
		}
        return id;
	}
	Controller.prototype.addMemo = function (givenId){
        var newId = this.generateId();
        var memo = {id:newId,title:"",content:""};
        this.model.addMemo(memo); //add memo into array at the next index of prevousId
        var newNode = this.view.createMemoElement(givenId, memo.id); //add memo into node at the next to prevousId
        this.bindEvent(newNode);
    }
    Controller.prototype.updateMemo = function (type, id, node){
        this.model.updateMemo(type, id, node.innerHTML);
    }
	Controller.prototype.deleteMemo = function (newNode){
	    this.model.deleteMemo(newNode.id);
		this.view.deleteMemo(newNode);
	}
	//export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);

(function(window){
	'use strict'
 	function DetectChange(storeArray, modelArray){
		this.storeArray = []; // new Array container
		for (var i in storeArray){
		    this.storeArray[i] = Object.assign({}, storeArray[i]);
		}
		this.modelArray = []; // new Array container
		for (var i in modelArray){
		    this.modelArray[i] = Object.assign({}, modelArray[i]);
		}
			/*this.storeArray = Array.from(storeArray, x=>x);
			this.modelArray = Array.from(modelArray, x=>x);*/
	}
	DetectChange.prototype.getDifferentItems = function (){
		for (var i in this.modelArray)
			for (var j in this.storeArray){
				if (JSON.stringify(this.modelArray[i]) == JSON.stringify(this.storeArray[j])){
				this.modelArray.splice(i,1);
				this.storeArray.splice(j,1);
				this.getDifferentItems();
				}
			}
		return {store:this.storeArray, model:this.modelArray};
	}
	window.app = window.app || {};
	window.app.DetectChange = DetectChange;
})(window);
/* testcode
window.DetectChange = app.DetectChange(store.pinBoard, model.pinBoard);
detectChange.getDifferentItems();
*/

//APP
(function(window){
	'use strict'

    window.store = new app.Store;
	window.model = new app.Model(store.pinBoard);

	window.view = new app.View();
	window.controller = new app.Controller(model, view, store);
})(window);
