class ImageResizer {
	constructor(quill) {
		this.quill = quill;
		this.root = quill.addContainer("ql-image-resizer");
		this.root.appendChild(this.createControls());
		this.image = null;
		this.active = false;
		this.hide();
	}
	createControls() {
		var container = document.createElement("div");
		container.className = "ql-controls-container";

		var topLeft = document.createElement("div");
		topLeft.className = "ql-control ql-top-left";
		container.appendChild(topLeft);

		var topRight = document.createElement("div");
		topRight.className = "ql-control ql-top-right";
		container.appendChild(topRight);

		var bottomLeft = document.createElement("div");
		bottomLeft.className = "ql-control ql-bottom-left";
		container.appendChild(bottomLeft);

		var bottomRight = document.createElement("div");
		bottomRight.className = "ql-control ql-bottom-right";
		container.appendChild(bottomRight);

		var resizing = false, startX, startY, startWidth, startHeight, ratio;
		var resizingLeft, resizingTop;
		var startResize = (e) => {
			if (this.image != null) {
				resizing = true;
				startX = e.pageX;
				startY = e.pageY;
				startWidth = this.image.offsetWidth;
				startHeight = this.image.offsetHeight;
				ratio = startWidth / startHeight;
			}
		}
		topLeft.onmousedown = (e) => {
			resizingLeft = true;
			resizingTop = true;
			startResize(e);
		};
		topRight.onmousedown = (e) => {
			resizingLeft = false;
			resizingTop = true;
			startResize(e);
		};
		bottomLeft.onmousedown = (e) => {
			resizingLeft = true;
			resizingTop = false;
			startResize(e);
		};
		bottomRight.onmousedown = (e) => {
			resizingLeft = false;
			resizingTop = false;
			startResize(e);
		};
		document.body.addEventListener("mousemove", (e) => {
			if (resizing && this.image) {
				var deltaX = e.pageX - startX;
				if (resizingLeft){
					deltaX = -deltaX;
				}
		        var deltaY = e.pageY - startY;
		        if (resizingTop){
		        	deltaY = -deltaY;
		        }
		        var deltaWidth = Math.min(deltaX, deltaY * ratio);
		        this.image.setAttribute('width', Math.max(startWidth + deltaWidth, 100));
		        this.updatePosition();
			}
		});
		document.body.addEventListener("mouseup", (e) => {
			resizing = false;
		});
		document.body.addEventListener("mouseleave", (e) => {
			resizing = false;
		});


		return container;
	}
	show(){
		this.root.classList.remove("ql-hidden");
		this.active = true;
	}
	hide(){
		this.root.classList.add("ql-hidden");
		this.active = false;
		this.image = null;
	}
	updatePosition(){
		this.root.style.top = this.image.offsetTop;
		this.root.style.left = this.image.offsetLeft;
		this.root.style.width = this.image.offsetWidth;
		this.root.style.height = this.image.offsetHeight;
	}
	controlImage(image) {
		this.image = image;
		this.updatePosition();
		this.show();
	}
}
export default ImageResizer;