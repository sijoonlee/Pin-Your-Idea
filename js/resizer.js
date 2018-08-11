/* SOURCE
https://jsfiddle.net/RainStudios/mw786v1w/
*/
(function(window){
	'use strict'
    
    class Resizer {
        constructor(){
        }
    
        resizerInit(newNode, resizerNode, memo){
            this.newNode = newNode;
            this.resizerNode = resizerNode;
            this.memo = memo || {width:100, height:200};
            resizerNode.onmousedown = this.resizerMouseDown.bind(this);
        }
    
        resizerMouseDown(e) {
            document.onmouseup = this.stopResizeElement.bind(this);
            document.onmousemove = this.resizeElement.bind(this);
        }
    
        resizeElement(e) {
            this.memo.width = e.clientX - this.newNode.offsetLeft;
            this.memo.height = e.clientY - this.newNode.offsetTop;
            this.newNode.style.width = this.memo.width + 'px'
            this.newNode.style.height = this.memo.height + 'px';
            
            var h1 = this.newNode.getElementsByClassName("title")[0].style.height.replace("px","");
            var h2 = this.newNode.getElementsByClassName("top")[0].style.height.replace("px","");
            var h3 = this.newNode.getElementsByClassName("bottom")[0].style.height.replace("px","");
            this.newNode.getElementsByClassName("content")[0].style.height = this.memo.height - h1 - h2 - h3 + 'px';
        
        }
    
        stopResizeElement(e) {
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }
    
	window.app = window.app || {};
	window.app.Resizer = Resizer;
})(window);
