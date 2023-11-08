// Ouvrir modale galérie
const modalGallery = document.getElementById("modalGallery");
const openModalGalleryBtn = document.getElementById("openModalGallery");

openModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    modalGallery.showModal();
    modalGallery.style.display = "flex";

    modalPhoto.style.display = "none";

    modalGallery.removeAttribute("aria-hidden");
    modalGallery.setAttribute("aria-modal", "true");
})

// Fermer modale galérie
const closeModalGalleryBtn = document.querySelector(".closeModalGallery");

closeModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    modalGallery.close();
    modalGallery.style.display = "none";
    modalGallery.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-modal");

})

// Fermeture modale photo avec un clic en dehors de la modale
modalGallery.addEventListener("click", e => {
    const modalGalleryDimensions = modalGallery.getBoundingClientRect()
    if (
      e.clientX < modalGalleryDimensions.left ||
      e.clientX > modalGalleryDimensions.right ||
      e.clientY < modalGalleryDimensions.top ||
      e.clientY > modalGalleryDimensions.bottom
    ) {
      modalGallery.close()
      modalGallery.style.display = "none";
      modalGallery.setAttribute("aria-hidden", "true");
      modalGallery.removeAttribute("aria-modal");
    }
  })

  const stopPropagation = (e)=> {
    e.stopPropagation();
  }

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
        figureDeleteButton.classList.add("figureDeleteBtn");

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
    modalGallery.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-modal");


    modalPhoto.removeAttribute("aria-hidden");
    modalPhoto.setAttribute("aria-modal", "true");


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
    modalPhoto.style.display = "none";
    modalPhoto.setAttribute("aria-hidden", "true");
    modalPhoto.removeAttribute("aria-modal");

    modalGallery.close();
    modalGallery.style.display = "none";
    modalGallery.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-modal");

    previewImage.style.display = "none"
    pTag.style.display = "initial";
    labelTag.style.display = "initial";
    iconInput.style.display = "initial";

    submitBtn.disabled = true;

    inputTitle.value = "";
    select.selectedIndex = 0;
})

// Fermeture modale photo avec un clic en dehors de la modale
modalPhoto.addEventListener("click", e => {
    const modalPhotoDimensions = modalPhoto.getBoundingClientRect()
    if (
        e.clientX < modalPhotoDimensions.left ||
        e.clientX > modalPhotoDimensions.right ||
        e.clientY < modalPhotoDimensions.top ||
        e.clientY > modalPhotoDimensions.bottom
    ) {
        modalPhoto.close();
        modalPhoto.style.display = "none";
        modalPhoto.setAttribute("aria-hidden", "true");
        modalPhoto.removeAttribute("aria-modal");

        submitBtn.disabled = true;
    }
  })

//   Fermeture des modales avec Escape
window.addEventListener("keydown", (e)=> {
    if(e.key === "Escape" || e.key === "Esc") {
        modalPhoto.close();
        modalPhoto.style.display = "none";
        modalPhoto.setAttribute("aria-hidden", "true");
        modalPhoto.removeAttribute("aria-modal");

        modalGallery.close();
        modalGallery.style.display = "none";
        modalGallery.setAttribute("aria-hidden", "true");
        modalGallery.removeAttribute("aria-modal");

        submitBtn.disabled = true;
    }
})

//Retour modale galérie
const backModalGalleryBtn = document.querySelector(".backModalGallery");

backModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    modalPhoto.close();
    modalPhoto.style.display = "none";
    modalPhoto.setAttribute("aria-hidden", "true");
    modalPhoto.removeAttribute("aria-modal");

    modalGallery.showModal();
    modalGallery.style.display = "flex";
    modalGallery.removeAttribute("aria-hidden");
    modalGallery.setAttribute("aria-modal", "true");

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
modalPhotoForm.select.addEventListener("click", stopPropagation);
