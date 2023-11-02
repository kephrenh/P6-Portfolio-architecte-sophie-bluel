// Affichage travaux dans modal gallery
const modalGallery = document.getElementById("modal-gallery");

const galleryModal = document.querySelector(".gallery-modal");

fetch(apiUrl)
    .then(response => response.json())  //conversion en json
    .then(json => addModalFigure(json))    //affichage des travaux
    .catch(err => console.log("Request Failed", err))  //catch erreurs

function addModalFigure(works) {

    works.forEach((work) => {

        const figure = document.createElement("figure");
        figure.classList.add("gallery-modal-figure");

        const figureImg = document.createElement("img")
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;
        figureImg.classList.add("gallery-modal-image");

        const figureDeleteButton = document.createElement("button")
        figureDeleteButton.classList.add("delete-figure");

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

// Ouvrir Modal
let modal = null;

const openModalButton = document.querySelector(".modal-gallery-open");

const openModal = (e)=> {
    e.preventDefault();

    modal = document.getElementById("modal");
    const modalGallery = document.getElementById("modal-gallery");

    modal.style.display = null;
    modalGallery.style.display = "flex";

    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}
openModalButton.addEventListener("click", openModal)

// Fermer Modal
const closeModalButton = document.querySelector(".modal-gallery-close");

const closeModal = (e)=> {
    e.preventDefault();

    modal = document.getElementById("modal");
    modal.style.display = "none";

    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
}
closeModalButton.addEventListener("click", closeModal);

// Ouvrir Modal Photo
const openModalPhotoButton = document.querySelector(".modal-gallery-button");

const openModalPhoto = (e)=> {
    e.preventDefault();

    const modalGallery = document.getElementById("modal-gallery")
    modalPhoto = document.getElementById("modal-photo");

    modalPhoto.style.display = null;
    modalGallery.style.display ="none";

    modalPhoto.removeAttribute("aria-hidden");
    modalPhoto.setAttribute("aria-modal", "true");
}
openModalPhotoButton.addEventListener("click", openModalPhoto);

// Fermer Modal Photo
const closeModalPhotoButton = document.querySelector(".modal-photo-close");

const closeModalPhoto = (e)=> {
    e.preventDefault();

    const modalGallery = document.getElementById("modal-gallery")
    const modal = document.getElementById("modal");
    modalPhoto = document.getElementById("modal-photo");

    modalPhoto.style.display = "none";
    modal.style.display = "none";
    modalGallery.style.display = "none";

    modalPhoto.setAttribute("aria-hidden", "true");
    modalPhoto.removeAttribute("aria-modal");
}
closeModalPhotoButton.addEventListener("click", closeModalPhoto);

// Retour de Modal Photo à Modal Gallery
const backToModalGalleryButton = document.querySelector(".back-modal-gallery");

const backToModalGallery = (e)=> {
    e.preventDefault();

    modalPhoto = document.getElementById("modal-photo");
    const modalGallery = document.getElementById("modal-gallery")

    modalPhoto.style.display = "none";
    modalPhoto.removeAttribute("aria-hidden");
    modalPhoto.setAttribute("aria-modal", "true");

    modalGallery.style.display = "flex";
}
backToModalGalleryButton.addEventListener("click", backToModalGallery);