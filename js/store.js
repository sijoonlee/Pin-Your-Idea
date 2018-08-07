(function(window){
	'use strict' // IIFE + "use strict" prevent scope problems
	class Store {
	    constructor(pinBoard){
			var defaultPinBoard = [ {id: "memo-default", title: "New Post", content: "Write Something!"} ];
	        this.pinBoard = pinBoard || defaultPinBoard;
	    }
		savePinBoard (pinBoard){
			this.pinBoard = []; //reset array
		    for (var i in pinBoard){
		        this.pinBoard[i] = Object.assign({}, pinBoard[i]);
		    } // Clone Object Items ; Avoid model.pinBoard and store.pinBoard having same address
		}
	}
	// export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
