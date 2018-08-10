(function(window){
	'use strict'

    class Drag {

        constructor(){
        }

        dragInit(newNode, pinBoxNode, memo){ // elmnt : pinBox div
            this.newNode = newNode;
            this.pinBoxNode = pinBoxNode;
            this.memo = memo || {posX:0, posY:0};
            pinBoxNode.onmousedown = this.dragMouseDown.bind(this);
        }

        dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
        // get the mouse cursor position at startup:
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            document.onmouseup = this.closeDragElement.bind(this);
        // call a function whenever the cursor moves:
            document.onmousemove = this.dragElement.bind(this);
        }

        dragElement(e) {
            
            e = e || window.event;
            e.preventDefault();
        // calculate the new cursor position:
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
        // set the element's new position:
            this.memo.posY = this.newNode.offsetTop - this.pos2;
            this.memo.posX = this.newNode.offsetLeft - this.pos1;
            this.newNode.style.top = this.memo.posY + "px";
            this.newNode.style.left = this.memo.posX + "px";
        }

        closeDragElement(e) {
        /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }//class ends here

	window.app = window.app || {};
	window.app.Drag = Drag;
})(window);
