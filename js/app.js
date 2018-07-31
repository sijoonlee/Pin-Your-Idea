//Store
(function(window){
	'use strict'
    
    class Store {
        constructor(){
        this.pinBoard = [ {id: "default", title: "Your First memo", content: "Write Something!"} ];
        }
	}
    Store.prototype.savePinBoard = function (pinBoard){
		this.pinBoard = pinBoard;
	}
    Store.prototype.loadPinBoard = function (){
        return this.pinBoard;
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
var memoB = {id:"abc", title:"abc title", content:"abc"};
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
        constructor(store) {
            this.store = store;
            this.pinBoard = Array.from(this.store.loadPinBoard(), x=>x);
            //clone store.pinBoard to model.pinBoard
            //Also Possible: this.pinBoard = this.store.loadPinBoard().slice(0); 
            //Object Clone: var x = {myProp: "value"}; var y = Object.assign({}, x); 
            this.autoSave = false;
        }
    }

	Model.prototype.addMemo = function (memo){
		this.pinBoard.push(memo);
        if(this.autoSave) this.store.savePinBoard(this.pinBoard);
	}

	Model.prototype.findMemo = function (memo){
		for ( var i in this.pinBoard) {
			if ( this.pinBoard[i].id === memo.id ) return this.pinBoard[i];
		}
		return false;
	}
	Model.prototype.updateMemo = function (memo){
		if ( this.findMemo(memo) === false ) return false;
		this.findMemo(memo).title = memo.title;
		this.findMemo(memo).content = memo.content;
        if(this.autoSave) this.store.savePinBoard(this.pinBoard);
	}
	Model.prototype.deleteMemo = function (memo){
		this.pinBoard.splice(this.pinBoard.indexOf(this.findMemo(memo)),1);
        if(this.autoSave) this.store.savePinBoard(this.pinBoard);
	}
    Model.prototype.toggleAutoSave = function(){
        if(this.autoSave) this.autoSave = false;
        else this.autoSave = true;
    }
    

	//export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);




//view
(function(window){
	'use strict'

    class View {
        constructor(pinBoard) {
            this.pinBoard = pinBoard;
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





/*
//controller
(function(window){
	'use strict'
	Controller = function(pinBoard) {
			this.pinBoard = pinBoard;
	};
	Controller.prototype.addMemo = function (memo){
		this.pinBoard.set(memo.id, memo.obj);
	}
	Controller.prototype.updateMemo = function (id,memo){
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
*/




//app
(function(window){
	'use strict'
    window.store = new app.Store;
	window.model = new app.Model(store);
	//window.view = new app.View(store.loadPinBoard());
	//window.controller = new app.Controller(model, view);

})(window);

