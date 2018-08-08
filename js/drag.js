(function(window){
	'use strict'

    class Drag {

        constructor(){
        }

        dragElement(elmnt, memo){
            this.elmnt = elmnt;
            this.memo = memo || {posX:0, posY:0};
            elmnt.getElementsByClassName("pin")[0].onmousedown = this.dragMouseDown.bind(this);
        }

        dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
        // get the mouse cursor position at startup:
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            document.onmouseup = this.closeDragElement.bind(this);
        // call a function whenever the cursor moves:
            document.onmousemove = this.elementDrag.bind(this);
        }

        elementDrag(e) {
            
            e = e || window.event;
            e.preventDefault();
        // calculate the new cursor position:
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
        // set the element's new position:
            this.memo.posY = this.elmnt.offsetTop - this.pos2;
            this.memo.posX = this.elmnt.offsetLeft - this.pos1;
            this.elmnt.style.top = this.memo.posY + "px";
            this.elmnt.style.left = this.memo.posX + "px";
        }

        closeDragElement(e, memo) {
        /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }//class ends here

	window.app = window.app || {};
	window.app.Drag = Drag;
})(window);
