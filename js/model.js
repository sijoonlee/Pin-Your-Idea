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
		addMemo (memo){
			this.pinBoard.push(memo);
		}
		deleteMemo(id){
			this.pinBoard.splice(this.pinBoard.indexOf(this.findMemo(id)),1);
		}
		findMemo (id){
			for ( var i in this.pinBoard) {
				if ( this.pinBoard[i].id === id ) return this.pinBoard[i];
			}
			return false;
		}
		updateMemo (type, id, txt){
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

	}

	window.app = window.app || {};
	window.app.Model = Model;
})(window);
