//Store
(function(window){
	'use strict'

//
// pinBoard Array
// [ { id: , title: , content: }, { id: , title: , content: }, ... ]
// memo = {id:, title:, content:}
//
    class Store {
        constructor(){
        this.pinBoard = [ {id: "default", title: "Your First memo", content: "Write Something!"} ];
        }
	}
    Store.prototype.savePinBoard = function (pinBoard){
		this.pinBoard = pinBoard;
	}
    /*FILE I/O
    Store.prototype.readpinBoard = function (pinBoard){
	}
    Store.prototype.writepinBoard = function (pinBoard){
	}
    */
    window.app = window.app || {};
	window.app.Store = Store;
})(window);

//model
/* test code

var memoA = {id:"default", title:"new title", content:"new new"};
var memoB = {title:"abc title", content:"abc"};
model.addMemo(memoB);
console.log(model.pinBoard)
console.log(model.findMemo(memoB));
model.updateMemo(memoA);
console.log(model.pinBoard)
model.deleteMemo(memoB);
console.log(model.pinBoard);
*/
(function(window){
	'use strict'


    class Model {
        constructor(pinBoard) {
            this.pinBoard = []; // new Array container
            for (var i in pinBoard){
                this.pinBoard[i] = Object.assign({}, pinBoard[i]);
            } // Clone Object

            //this.pinBoard = Array.from(pinBoard, x=>x);
            //this.pinBoard = pinBoard.slice(0);
            //clone store.pinBoard to model.pinBoard
            //Also Possible: this.pinBoard = this.loadPinBoard().slice(0);
            //Object Clone: var x = {myProp: "value"}; var y = Object.assign({}, x);
        }
    }

	Model.prototype.generateId = function(memo){
		memo.id = "memo-" + Date.now();
	}

    Model.prototype.undoPinBoard = function (pinBoard){
        this.pinBoard = pinBoard;
	}

	Model.prototype.addMemo = function (memo){
		if(this.findMemo(memo)===false){
		this.generateId(memo);
		this.pinBoard.push(memo);
		}
		else return false;
        if(this.autoSave) this.savePinBoard(this.pinBoard);
	}

	Model.prototype.findMemo = function (memo){
		for ( var i in this.pinBoard) {
			if ( this.pinBoard[i].id === memo.id ) return this.pinBoard[i];
		}
		return false;
	}
    
    /*
	Model.prototype.updateMemo = function (memo){
		if ( this.findMemo(memo) === false ) return false;
		this.findMemo(memo).title = memo.title;
		this.findMemo(memo).content = memo.content;
    }
    */
    
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
                
	Model.prototype.deleteMemo = function (memo){
		this.pinBoard.splice(this.pinBoard.indexOf(this.findMemo(memo)),1);
	}

	//export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);




//view
/* CONTENTEDITABLE CHANGE EVENT
<div contenteditable="true" id="editor">Please type something in here</div>
document.getElementById("editor").addEventListener("input", function() {
    console.log("input event fired");
}, false);
*/
(function(window){
	'use strict'

    class View {
        constructor(pinBoard) {
            this.setView(pinBoard);
        }
    }

    View.prototype.collectNodeArray = function (pinBoard){
        var nodeArray = [];
        for ( var i in pinBoard ){
			var memoNode = document.getElementById(pinBoard[i].id);
            var titleNode = memoNode.getElementsByClassName("title")[0];
            var contentNode = memoNode.getElementsByClassName("content")[0];
            var deleteButtonNode = memoNode.getElementsByClassName("delete")[0];
            var hideButtonNode = memoNode.getElementsByClassName("hide")[0];
            nodeArray.push({id:pinBoard[i].id, title:titleNode, content:contentNode, deleteButton:deleteButtonNode, hideButton:hideButtonNode});
        }
        return nodeArray;
    }

    View.prototype.setView = function (pinBoard){
        var nodeArray = this.collectNodeArray(pinBoard);
        for (var i in nodeArray){
            var memoNode = nodeArray[i];
            memoNode.title.innerHTML = pinBoard[i].title;
            memoNode.title.contentEditable = true;
            memoNode.content.innerHTML = pinBoard[i].content;
            memoNode.content.contentEditable = true;
        }
    }
    View.prototype.toggleHide = function (node){
        var title = node.title;
        var content = node.content;
        if(content.style.display == 'none'){
            title.style.display = 'block'
            content.style.display = 'block';
        } else {
            title.style.display = 'none'
            content.style.display = 'none';
        }
        
    }
        


	View.prototype.addMemo = function (memo){  
	}
	View.prototype.findMemo = function (memo){
	}
	View.prototype.updateMemo = function (memo){
	}
	View.prototype.deleteMemo = function (memo){
	}
	View.prototype.loadpinBoard = function (memo){
	}
	View.prototype.savepinBoard = function (memo){
	}



	//export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);





//controller
(function(window){
	'use strict'
    class Controller {
        constructor(model, view, store) {
            this.model = model;
            this.view = view;
            this.store = store;
            this.autoSave = false;
            this.bindEvent(this.model.pinBoard);
        }
    }
    Controller.prototype.toggleAutoSave = function(){
        if(this.autoSave) this.autoSave = false;
        else this.autoSave = true;
    }
    
	Controller.prototype.addMemo = function (memo){
        
    }
    Controller.prototype.updateMemo = function (type, id, node){
        this.model.updateMemo(type, id, node.innerHTML);
        if(this.autoSave) this.store.savePinBoard(this.model.pinBoard);        
    }    
	
    Controller.prototype.bindEvent = function (pinBoard){
        var nodeArray = this.view.collectNodeArray(pinBoard);
        for (let i in nodeArray){
            var id = nodeArray[i].id;
            var titleNode = nodeArray[i].title;
            var contentNode = nodeArray[i].content;
            var hideButtonNode = nodeArray[i].hideButton;
            titleNode.addEventListener("input", this.updateMemo.bind(this, "title", id, titleNode));
            contentNode.addEventListener("input", this.updateMemo.bind(this, "content", id, contentNode));
            //nodeArray[i].deleteButton.addEventListener("click", this.deleteMemo);
            hideButtonNode.addEventListener("click", this.view.toggleHide.bind(this, nodeArray[i]));
        }
    }    
    
    
        
    

    Controller.prototype.undoPinBoard = function (){
        this.model.pinBoard = this.store.pinBoard;
        this.setView(this.model.pinBoard);
    }
	Controller.prototype.deleteMemo = function (id){
	}
	Controller.prototype.readMemo = function (id){
	}
	Controller.prototype.writeMemo = function (id){
	}


	//export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);





//app
(function(window){
	'use strict'
    window.store = new app.Store;
	window.model = new app.Model(store.pinBoard);
	window.view = new app.View(model.pinBoard);
	window.controller = new app.Controller(model, view, store);

})(window);
