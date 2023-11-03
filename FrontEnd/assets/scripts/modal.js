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
})

// Fermer modale galérie
const closeModalPhotoBtn = document.querySelector(".modalPhotoClose");

closeModalPhotoBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    modalPhoto.close();
    modalGallery.close();
    
    modalPhoto.style.display = "none";

    modalPhoto.setAttribute("aria-hidden", "true");
    modalGallery.style.display = "none";

})

// Passer de modale photo à modale galérie
const backModalGalleryBtn = document.querySelector(".backModalGallery");

backModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    modalPhoto.close();
    modalGallery.showModal();

    modalPhoto.style.display = "none";
    modalGallery.style.display = "flex";

    modalPhoto.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-hidden");
})
