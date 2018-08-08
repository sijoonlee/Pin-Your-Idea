//CONTROLLER
(function(window){
	'use strict'
	class Controller {
	    constructor(model, view, store, drag) {
	        this.model = model;
	        this.view = view;
	        this.store = store;
            this.drag = drag;
			var newNode = this.view.createMemoElement(null, this.store.pinBoard[0]);
			this.bindBasic();
			this.bindEvent(newNode);
	    }
		bindBasic(){
			var saveNode = document.getElementsByClassName("save")[0];
			var loadNode = document.getElementsByClassName("load")[0];
			//saveNode.addEventListener("click", this.savePinBoard.bind(this));
            //loadNode.addEventListener("click", this.loadPinBoard.bind(this));
            //replaced by Arrow function
            saveNode.addEventListener("click", ()=>{this.store.savePinBoard(this.model.pinBoard)});
            loadNode.addEventListener("click", ()=>{
                var newNodes = this.view.loadPinBoard(this.store.pinBoard);
                for (let i in newNodes)this.bindEvent(newNodes[i]);
            });
		}
		
        //replaced by Arrow function above "bindBasic()"
        /*savePinBoard(){
			this.store.savePinBoard(this.model.pinBoard);
		}
		loadPinBoard(){
			var newNodes = this.view.loadPinBoard(this.store.pinBoard);
			for (var i in newNodes){
				this.bindEvent(newNodes[i]);
			}
		}*/ 
        

		bindEvent (newNode){ //newNode = memo div
                    
			var id = newNode.id;
		    var titleNode = newNode.getElementsByClassName("title")[0];
		    var contentNode = newNode.getElementsByClassName("content")[0];
		    var hideButtonNode = newNode.getElementsByClassName("hide")[0];
		    var addButtonNode = newNode.getElementsByClassName("add")[0];
			var deleteButtonNode = newNode.getElementsByClassName("delete")[0];
            var pinBoxNode = newNode.getElementsByClassName("pin")[0];
            
            //titleNode.addEventListener("input", this.updateMemo.bind(this, "title", id, titleNode));
		    //contentNode.addEventListener("input", this.updateMemo.bind(this, "content", id, contentNode));
            //deleteButtonNode.addEventListener("click", this.deleteMemo.bind(this, newNode));
		    //addButtonNode.addEventListener("click", this.addMemo.bind(this, id));
		    //hideButtonNode.addEventListener("click", this.view.toggleHide.bind(this, newNode));
            //replaced by Arrow Function below
            
            titleNode.addEventListener("input", ()=>{
                this.model.updateMemo("title", id, titleNode.innerHTML);
            });
		    contentNode.addEventListener("input", ()=>{
                this.model.updateMemo("content", id, contentNode.innerHTML);
            });
		    deleteButtonNode.addEventListener("click", ()=>{
                this.model.deleteMemo(newNode.id);
                this.view.deleteMemo(newNode);
            });
		    addButtonNode.addEventListener("click", ()=>{
                let newId = this.generateId();
                let memo = {id:newId,title:"New Post",content:"Write Something!"};
                this.model.addMemo(memo); //add memo into array at the next index of prevousId
                let newNode = this.view.createMemoElement(id, memo); //add memo into node at the next to given id
                this.bindEvent(newNode);
            });
		    hideButtonNode.addEventListener("click", ()=>{
                this.view.toggleHide(newNode)
            });

            pinBoxNode.addEventListener("mouseover", ()=>{
                this.drag.dragElement(newNode, this.model.findMemo(newNode.id));    
            });
            
		}

            
        
		generateId (){
			let id = "memo-" + Date.now() + Math.floor(Math.random() * 1000);
			for (var i in this.model.pinBoard){
				if ( this.model.pinBoard[i] == id ){
					this.generateID();
				}
			}
	        return id;
		}
		//replaced by Arrow function in bindEvent
        /*addMemo(givenId){
	       var newId = this.generateId();
           var memo = {id:newId,title:"New Post",content:"Write Something!"};
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
		}*/
	}

	//export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
