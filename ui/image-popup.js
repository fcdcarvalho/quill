class ImagePopup {
	constructor(quill){
		this.quill = quill;

		var divPopup = document.createElement("div");
		divPopup.className = "ql-popup";
		this.divPopup = divPopup;

		var divOverlay = document.createElement("div");
		divOverlay.className = "ql-overlay";
		divPopup.appendChild(divOverlay);

		var divWindow = document.createElement("div");
		divWindow.className = "ql-window";
		divOverlay.appendChild(divWindow);

		var btnClose = document.createElement("div");
		btnClose.className = "ql-close";
		btnClose.innerHTML = "&times;";
		btnClose.onclick = () => {
			this.hide();
		}
		divWindow.appendChild(btnClose);

		var divHeader = document.createElement("div");
		divHeader.className = "ql-header";
		divHeader.innerHTML = "Inserir Imagem";
		divWindow.appendChild(divHeader);

		var form = document.createElement("form");
		this.form = form;
		divWindow.appendChild(form);

		var divSectionUrl = document.createElement("div");
		divSectionUrl.className = "ql-section";
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
		divSectionFile.className = "ql-section";
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
		divSectionButton.className = "ql-section ql-center";
		form.appendChild(divSectionButton);
		
		var btnInsert = document.createElement("button");
		btnInsert.innerHTML = "Inserir Imagem";
		btnInsert.onclick = (e) => {
			e.preventDefault();
			if (rdURL.checked){
				this.addFromURL(txtURL.value);
			} else {
				if (inputFile.files != null && inputFile.files[0] != null) {
					this.addFromFile(inputFile.files[0]);
				}
			}
		};
		divSectionButton.appendChild(btnInsert);

		var progressSection = document.createElement("div");
		progressSection.className = "ql-section ql-hidden";
		this.progressSection = progressSection;
		divWindow.appendChild(progressSection);

		var progressBarContainer = document.createElement("div");
		progressBarContainer.className = "ql-progress-bar-container";
		progressSection.appendChild(progressBarContainer);

		var progressBar = document.createElement("div");
		progressBar.className = "ql-progress-bar";
		this.progressBar = progressBar;
		progressBarContainer.appendChild(progressBar);

		this.show();
	}
	addFromURL(url){
		var selection = this.quill.getSelection(true);
		this.quill.insertEmbed(selection.index, 'image', url);
		this.hide();
	}
	addFromFile(imageFile){
		this.form.style.display = "none";
		this.progressSection.style.display = "block";

		var ImageUpload = this.quill.getModule("image-upload");
		ImageUpload.upload(imageFile, (error) => {
			if (error){
				alert(error);
			}
			this.hide();
		}, (progress) => {
			this.progressBar.style.width = progress * 100 + "%";
			this.progressBar.innerHTML = Math.round(progress * 100) + "%";
		});
		this.progressBar.innerHTML = "0%";
	}  
    show(){
    	document.body.appendChild(this.divPopup);
		this.txtURL.focus();
    }
    hide(){
    	document.body.removeChild(this.divPopup);
    }
}
export default ImagePopup;
