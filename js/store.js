(function(window){
	'use strict' // IIFE + "use strict" prevent scope problems
	class Store {
	    constructor(pinBoard){
			var defaultPinBoard = [ {id: "memo-default", title: "New Post", content: "Write Something!", posX: 100, posY: 100, width: 100, height: 200, hide: 0} ];
	        this.pinBoard = pinBoard || defaultPinBoard;
	    }
		savePinBoard (pinBoard){
			this.pinBoard = []; //reset array
		    for (var i in pinBoard){
		        this.pinBoard[i] = Object.assign({}, pinBoard[i]);
		    } // Clone Object Items ; Avoid model.pinBoard and store.pinBoard having same address
		}
        findMemo (id){
			for ( var i in this.pinBoard) {
				if ( this.pinBoard[i].id === id ) return this.pinBoard[i];
			}
			return false;
		}
	}
	// export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
