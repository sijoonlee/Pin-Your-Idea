(function(window){
	'use strict' // IIFE + "use strict" prevent scope problems
	class Store {
	    constructor(pinBoard){
			var defaultPinBoard = [ {id: "memo-default", title: "", content: ""} ];
	        this.pinBoard = pinBoard || defaultPinBoard;
	    }
		savePinBoard (pinBoard){
			console.log(this);
			this.pinBoard = []; //reset array
		    for (var i in pinBoard){
		        this.pinBoard[i] = Object.assign({}, pinBoard[i]);
		    } // Clone Object Items
		}
	}
	// export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
