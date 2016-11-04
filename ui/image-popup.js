class ImagePopup {
	constructor(quill){
		this.quill = quill;

		var divOverlay = document.createElement("div");
		divOverlay.className = "overlay";
		this.divOverlay = divOverlay;

		var divWindow = document.createElement("div");
		divWindow.className = "window";
		divOverlay.appendChild(divWindow);

		var btnClose = document.createElement("div");
		btnClose.className = "close";
		btnClose.innerHTML = "&times;";
		btnClose.onclick = () => {
			this.hide();
		}
		divWindow.appendChild(btnClose);

		var divHeader = document.createElement("div");
		divHeader.className = "header";
		divHeader.innerHTML = "Inserir Imagem";
		divWindow.appendChild(divHeader);

		var form = document.createElement("form");
		divWindow.appendChild(form);

		var divSectionUrl = document.createElement("div");
		divSectionUrl.className = "section";
		form.appendChild(divSectionUrl);

		var labelUrl = document.createElement("label");
		divSectionUrl.appendChild(labelUrl);

		var rdURL = document.createElement("input");
		rdURL.type = "radio";
		rdURL.name ="method";
		rdURL.value = "url";
		rdURL.checked = "true";
		rdURL.onclick = function(){
			txtURL.disabled = false;
			inputFile.disabled = true;
		};
		labelUrl.appendChild(rdURL);
		labelUrl.appendChild(document.createTextNode("Inserir da url..."));

		var txtURL = document.createElement("input");
		txtURL.type = "text";
		txtURL.placeholder = "http://";
		divSectionUrl.appendChild(txtURL);
		this.txtURL = txtURL;
		
		var divSectionFile = document.createElement("div");
		divSectionFile.className = "section";
		form.appendChild(divSectionFile);

		var labelFile = document.createElement("label");
		divSectionFile.appendChild(labelFile);

		var rdFile = document.createElement("input");
		rdFile.type = "radio";
		rdFile.name ="method";
		rdFile.value = "file";
		rdFile.onclick = function(){
			inputFile.disabled = false;
			txtURL.disabled = true;
		};
		labelFile.appendChild(rdFile);
		labelFile.appendChild(document.createTextNode("Inserir do Arquivo..."));

		var inputFile = document.createElement("input");
		inputFile.type = "file";
		inputFile.disabled = true;
		inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('accept', 'image/*');
		divSectionFile.appendChild(inputFile);

		var divSectionButton = document.createElement("div");
		divSectionButton.className = "section center";
		form.appendChild(divSectionButton);
		
		var btnInsert = document.createElement("button");
		btnInsert.innerHTML = "Inserir Imagem";
		btnInsert.onclick = (e) => {
			e.preventDefault();
			if (rdURL.checked){
				this.addFromURL(quill, txtURL.value);
			} else {
				this.addFromFile(quill, inputFile);
			}
			this.hide();
		};
		divSectionButton.appendChild(btnInsert);

		this.show();
	}
	addFromURL(quill, url){
		var selection = quill.getSelection(true);
		quill.insertEmbed(selection.index, 'image', url);
	}
	addFromFile(quill, inputFile){
		if (inputFile.files != null && inputFile.files[0] != null) {
            let reader = new FileReader();
            reader.onload = (e) => {
            	this.addFromURL(quill, e.target.result);
            	//TODO implement upload code
        	}
            reader.readAsDataURL(inputFile.files[0]);
        }
    }
    show(){
    	document.body.appendChild(this.divOverlay);
		this.txtURL.focus();
    }
    hide(){
    	document.body.removeChild(this.divOverlay);
    }
}
export default ImagePopup;
