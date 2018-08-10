//TEST Function for detecting difference between store.pinBoard and model.pinBoard
/* testcode
window.DetectChange = app.DetectChange(store.pinBoard, model.pinBoard);
detectChange.getDifferentItems();
*/
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


//APP
(function(window){
	'use strict'

    window.store = new app.Store;
	window.model = new app.Model(store.pinBoard);
	window.view = new app.View();
    window.drag = new app.Drag;
    window.resizer = new app.Resizer;
	window.controller = new app.Controller(model, view, store, drag, resizer);
    
})(window);
