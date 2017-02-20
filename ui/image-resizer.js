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
            console.log(e);
            if (!resizing && this.image != null) {
                resizing = true;
                if (e.touches && e.touches[0]) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                } else {
                    startX = e.pageX;
                    startY = e.pageY;
                }
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
        topLeft.addEventListener("touchstart", (e) => {
            resizingLeft = true;
            resizingTop = true;
            startResize(e);
        });
        topRight.onmousedown = (e) => {
            resizingLeft = false;
            resizingTop = true;
            startResize(e);
        };
        topRight.addEventListener("touchstart", (e) => {
            resizingLeft = false;
            resizingTop = true;
            startResize(e);
        });
        bottomLeft.onmousedown = (e) => {
            resizingLeft = true;
            resizingTop = false;
            startResize(e);
        };
        bottomLeft.addEventListener("touchstart", (e) => {
            resizingLeft = true;
            resizingTop = false;
            startResize(e);
        });
        bottomRight.onmousedown = (e) => {
            resizingLeft = false;
            resizingTop = false;
            startResize(e);
        };
        bottomRight.addEventListener("touchstart", (e) => {
            resizingLeft = false;
            resizingTop = false;
            startResize(e);
        })
        const handlePointerMove = (e) => {
            if (resizing && this.image) {
                let pageX, pageY;
                if (e.touches && e.touches[0]) {
                    pageX = e.touches[0].pageX;
                    pageY = e.touches[0].pageY;
                } else {
                    pageX = e.pageX;
                    pageY = e.pageY;
                }

                var deltaX = pageX - startX;
                if (resizingLeft){
                    deltaX = -deltaX;
                }
                var deltaY = pageY - startY;
                if (resizingTop){
                    deltaY = -deltaY;
                }
                var deltaWidth = Math.min(deltaX, deltaY * ratio);
                this.image.setAttribute('width', Math.max(startWidth + deltaWidth, 100));
                this.updatePosition();
            }
        }
        document.body.addEventListener("mousemove", handlePointerMove);
        document.body.addEventListener("touchmove", handlePointerMove);
        document.body.addEventListener("mouseup", () => {
            resizing = false;
        });
        document.body.addEventListener("mouseleave", () => {
            resizing = false;
        });
        document.body.addEventListener("touchend", () => {
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
        this.root.style.top = this.image.offsetTop + "px";
        this.root.style.left = this.image.offsetLeft + "px";
        this.root.style.width = this.image.offsetWidth + "px";
        this.root.style.height = this.image.offsetHeight + "px";
    }
    controlImage(image) {
        this.image = image;
        this.updatePosition();
        this.show();
    }
}
export default ImageResizer;
