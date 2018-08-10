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
				`<div class=\"bottom\"><div class = \"pin\"></div><input class=\"hide\" type=\"button\" value=\"hide\"><input class=\"add\" type=\"button\" value=\"add\"><input class=\"delete\" type=\"button\" value=\"delete\"></div></div><div contentEditable = true class = \"title\">${newMemo.title}</div><div contentEditable = true class = \"content\">${newMemo.content}</div><div class = \"bottom\"></div><div class = \"resizer\"></div>`; //ES6 string
			//when there is no existing memo, it will be placed in "pinBoard"
			//otherwise, it will be added after existing memo.
            newNode.style.top = newMemo.posY +"px";
            newNode.style.left = newMemo.posX + "px";
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
				newNodes.push(this.createMemoElement(null,pinBoard[i])); //create memo div
			}
			return newNodes; //return array of new nodes
		}
		toggleHide(memoNode){
	    	var title = memoNode.getElementsByClassName("title")[0];
	    	var content = memoNode.getElementsByClassName("content")[0];
	    	if(content.style.display == 'none'){
	        	content.style.display = 'block';
                memoNode.style.height = '250px';
	    	} else {
	        	content.style.display = 'none';
                memoNode.style.height = '4em';
	    	}
		}
	}//class ends here
	//Export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);
