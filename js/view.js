//VIEW
(function(window){
	'use strict'
	class View { //class starts here
		constructor() {
			this.createBasicElement();
		}
		createBasicElement(){
			//save, load button
			var panelNode = document.createElement("div");
			panelNode.setAttribute("class", "panel");
			panelNode.innerHTML =
			"<input class=\"save\" type=\"button\" value=\"save\"></div><input class=\"load\" type=\"button\" value=\"load\">";
			document.body.appendChild(panelNode);
			//pinBoard area
			var pinBoardNode = document.createElement("div");
			pinBoardNode.setAttribute("class", "pinBoard");
			pinBoardNode.innerHTML = "";
			document.body.appendChild(pinBoardNode);
		}
		createMemoElement(givenId, newMemo){
			//create new memo node after given Id
			var newNode = document.createElement("div");
			newNode.setAttribute("class", "memo");
			newNode.setAttribute("id", newMemo.id);
			newNode.innerHTML =
				`<div contentEditable = true class = \"title\">${newMemo.title}</div><div contentEditable = true class = \"content\">${newMemo.content}</div><input class=\"hide\" type=\"button\" value=\"hide\"><input class=\"add\" type=\"button\" value=\"add\"></div><input class=\"delete\" type=\"button\" value=\"delete\">`; //ES6 string
			//when there is no existing memo, it will be placed in "pinBoard"
			//otherwise, it will be added after existing memo.
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
		deleteMemo(targetNode){
			targetNode.parentNode.removeChild(targetNode);
		}
		loadPinBoard(pinBoard){
			var existingPinBoard = document.getElementsByClassName("pinBoard")[0];
			existingPinBoard.innerHTML = ""; // clean board
			//create new board from store.pinBoard
			var newNodes = [];
			for (var i in pinBoard){
				newNodes.push(this.createMemoElement(null,pinBoard[i]));
			}
			return newNodes; //return array of new nodes
		}
		toggleHide(memoNode){
	    	var title = memoNode.getElementsByClassName("title")[0];
	    	var content = memoNode.getElementsByClassName("content")[0];
	    	if(content.style.display == 'none'){
	        	content.style.display = 'block';
	    	} else {
	        	content.style.display = 'none';
	    	}
		}
	}//class ends here
	//Export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);
