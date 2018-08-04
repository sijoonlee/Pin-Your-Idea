//CONTROLLER
(function(window){
	'use strict'
	class Controller {
	    constructor(model, view, store) {
	        this.model = model;
	        this.view = view;
	        this.store = store;
			var newNode = this.view.createMemoElement(null, {id:"memo-default",title:"New Post",content:"Writing Something!"});
			this.bindBasic();
			this.bindEvent(newNode);
	    }
		bindBasic(){
			var saveNode = document.getElementsByClassName("save")[0];
			var loadNode = document.getElementsByClassName("load")[0];
			saveNode.addEventListener("click", this.savePinBoard.bind(this));
			loadNode.addEventListener("click", this.loadPinBoard.bind(this));
		}
		savePinBoard(){
			this.store.savePinBoard(this.model.pinBoard);
		}
		loadPinBoard(){
			var newNodes = this.view.loadPinBoard(this.store.pinBoard);
			console.log(this.store.pinBoard);
			console.log(newNodes);
			for (var i in newNodes){
				this.bindEvent(newNodes[i]);
			}
		}

		bindEvent (newNode){
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

		generateId (){
			var id = "memo-" + Date.now() + Math.floor(Math.random() * 1000);
			for (var i in this.model.pinBoard){
				if ( this.model.pinBoard[i] == id ){
					this.generateID();
				}
			}
	        return id;
		}
		addMemo(givenId){
	        var newId = this.generateId();
	        var memo = {id:newId,title:"New Post",content:"Writing Something!"};
	        this.model.addMemo(memo); //add memo into array at the next index of prevousId
	        var newNode = this.view.createMemoElement(givenId, memo); //add memo into node at the next to prevousId
	        this.bindEvent(newNode);
	    }
	    updateMemo(type, id, node){
	        this.model.updateMemo(type, id, node.innerHTML);
	    }
		deleteMemo(newNode){
		    this.model.deleteMemo(newNode.id);
			this.view.deleteMemo(newNode);
		}
	}

	//export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
