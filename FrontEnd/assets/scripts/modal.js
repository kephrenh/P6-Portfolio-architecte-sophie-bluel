// Ouvrir modale galérie
const modalGallery = document.getElementById("modalGallery");
const openModalGalleryBtn = document.getElementById("openModalGallery");

openModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    modalGallery.showModal();
    modalGallery.style.display = "flex";

    modalPhoto.style.display = "none";

    modalGallery.removeAttribute("aria-hidden");
})

// Fermer modale galérie
const closeModalGalleryBtn = document.querySelector(".closeModalGallery");

closeModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    modalGallery.close();
    modalGallery.style.display = "none";

    modalGallery.setAttribute("aria-hidden", "true");
})

// Ajout des travaux à la modale galérie
const galleryModal = document.querySelector(".galleryModal");
fetch(apiUrl)
    .then(response => response.json())  //conversion en json
    .then(json => addModalFigure(json))    //affichage des travaux
    .catch(err => console.log("Request Failed", err))  //catch erreurs

function addModalFigure(works) {

    works.forEach((work) => {

        const figure = document.createElement("figure");
        figure.classList.add("galleryModalFigure");

        const figureImg = document.createElement("img")
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;
        figureImg.classList.add("galleryModalFigureImage");

        const figureDeleteButton = document.createElement("button")
        figureDeleteButton.classList.add("galleryModalFigureDelete");

        const figureDeleteIcon = document.createElement("i");
        figureDeleteIcon.classList.add("fa-solid");
        figureDeleteIcon.classList.add("fa-trash-can");

        figureDeleteButton.appendChild(figureDeleteIcon);

        figure.setAttribute("data-id", work.id);
        figure.setAttribute("category-id", work.categoryId);

        figure.appendChild(figureImg);
        figure.appendChild(figureDeleteButton);

        galleryModal.appendChild(figure);
    })
}

// Ouvrir modale photo
const modalPhoto = document.getElementById("modalPhoto");
const openModalPhotoBtn = document.getElementById("addPhotoButton");

openModalPhotoBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    modalPhoto.showModal();
    modalGallery.close(); 

    modalPhoto.style.display = "flex";
    modalGallery.style.display = "none";

    modalPhoto.removeAttribute("aria-hidden");

    previewImage.style.display = "none"
    pTag.style.display = "initial";
    labelTag.style.display = "initial";
    iconInput.style.display = "initial";

    inputTitle.value = "";
    select.selectedIndex = 0;
})

// Fermer modale photo
const closeModalPhotoBtn = document.querySelector(".modalPhotoClose");

closeModalPhotoBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    modalPhoto.close();
    modalGallery.close();
    
    modalPhoto.style.display = "none";

    modalPhoto.setAttribute("aria-hidden", "true");
    modalGallery.style.display = "none";

    previewImage.style.display = "none"
    pTag.style.display = "initial";
    labelTag.style.display = "initial";
    iconInput.style.display = "initial";

    submitBtn.disabled = true;

    inputTitle.value = "";
    select.selectedIndex = 0;
})

//Retour modale galérie
const backModalGalleryBtn = document.querySelector(".backModalGallery");

backModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    modalPhoto.close();
    modalGallery.showModal();

    modalPhoto.style.display = "none";
    modalGallery.style.display = "flex";

    modalPhoto.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-hidden");

    previewImage.style.display = "none"
    pTag.style.display = "initial";
    labelTag.style.display = "initial";
    iconInput.style.display = "initial";

    submitBtn.disabled = true;

    inputTitle.value = "";
    select.selectedIndex = 0;
})

// Ajout image preview
const imageInput = document.getElementById("image");

const iconInput = document.querySelector(".fa-image");

const pTag = document.querySelector(".modalPhotoMain p");
const labelTag = document.querySelector(".modalPhotoMain label");

const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", (e)=> {
    if(e.target.files.length > 0 ) {
        previewImage.src = URL.createObjectURL(e.target.files[0]);
        previewImage.style.display = "block";

        pTag.style.display = "none";
        labelTag.style.display = "none";
        iconInput.style.display = "none";
    }

    imageInput.value = null;
});

// Activation bouton Valider
const modalPhotoForm = document.querySelector(".modalPhotoForm");
const submitBtn = document.getElementById("submitBtn");

submitBtn.disabled = true;
submitBtn.ariaDisabled = true;

const inputTitle = document.getElementById("title");
const select = document.getElementById("select");

function checkLength() {    //Vérifier si
    if(inputTitle.value.length > 0) {
        return true;
    } else {
        return false
    }
}

function checkSelect() {
    if(select.selectedIndex !== 0) {
        return true;
    } else {
        return false
    }
}


function checkImage() {
    if(previewImage.style.display !== "none") {
        return true;
    } else {
        return false
    }
}

const activateSubmitButton = (e)=> {
    e.preventDefault();
    if(checkSelect() === true && checkLength() === true && checkImage() === true) {
        submitBtn.disabled = false;
        submitBtn.ariaDisabled = false;
    } else {
        submitBtn.disabled = true;
        submitBtn.ariaDisabled = true;
    }
}
modalPhotoForm.addEventListener("change", activateSubmitButton);


