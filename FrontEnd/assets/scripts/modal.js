// Ouvrir modale gallérie
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

// Fermer modale gallérie
const closeModalGalleryBtn = document.querySelector(".closeModalGallery");

closeModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    e.stopPropagation();

    modalGallery.close();
    modalGallery.style.display = "none";
    modalGallery.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-modal");

})

// Fermeture modale gallérie avec un clic en dehors de la modale
modalGallery.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

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

// Ajouter les travaux à la modale gallérie
const galleryModal = document.querySelector(".galleryModal");
let urlWorks = "http://www.localhost:5678/api/works";

fetch(urlWorks)
    .then(response => response.json())  
    .then(json => addModalFigure(json))    
    .catch(err => console.log("Request Failed", err)) 

function addModalFigure(works) {

    works.forEach((work) => {
        // Créer balise figure
        const figure = document.createElement("figure");
        figure.classList.add("modalFigure");
        figure.setAttribute("data-id", work.id);
        figure.setAttribute("category-id", work.categoryId);

        // Créer balise img
        const figureImg = document.createElement("img")
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;
        figureImg.classList.add("modalImage");

        // Créer balise button
        const trashButton = document.createElement("button")
        trashButton.classList.add("trash-button");

        // Créer balise i
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid");
        trashIcon.classList.add("fa-trash-can");
        trashIcon.classList.add("trash-icon");

        // Intégrer balise i dans balise button
        trashButton.appendChild(trashIcon);

        // Intégrer balises img and button dans balise figure
        figure.appendChild(figureImg);
        figure.appendChild(trashButton);

        // Intégrer balise figure dans la balise "div class=galleryModal"
        galleryModal.appendChild(figure);

        // Ajouter Event Listener à trashButton pour supprimer les travaux
        trashButton.addEventListener("click", (e)=> {
            e.preventDefault();
            e.stopPropagation();
            deleteWork(work.id);
        });
    })
}

// Supprimer un projet
function deleteWork(workId) {
    const token = sessionStorage.getItem("token");
    const confirmation = confirm("Voulez-vous supprimer cet élément?");

    if(confirmation) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new error ("Echec de la suppression");
            }
            if(response.status === 200) {
                const workToRemove = document.querySelector(`figure[data-id="${workId}"]`);
                workToRemove.remove();
            }
            if(response.status === 401) return alert("Unauthorized action");
            if(response.status === 500) return alert("Unexpected behavior");
        })
        .catch(err => console.log(err));
    }
}

// Ouvrir modale photo
const modalPhoto = document.getElementById("modalPhoto");
const openModalPhotoBtn = document.getElementById("addPhotoButton");

openModalPhotoBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    e.stopPropagation();

    // Ouvrir modale photo
    modalPhoto.showModal(); 
    modalPhoto.style.display = "flex";
    modalPhoto.removeAttribute("aria-hidden");
    modalPhoto.setAttribute("aria-modal", "true");

    // Fermer modale gallérie
    modalGallery.close();   
    modalGallery.style.display = "none";
    modalGallery.setAttribute("aria-hidden", "true");
    modalGallery.removeAttribute("aria-modal");

    // Cacher aperçu image
    previewImage.style.display = "none"

    // Afficher les autres éléments de modalPhotoMain
    pTag.style.display = "initial";
    labelTag.style.display = "initial";
    iconInput.style.display = "initial";

    // Effacer le contenu de l'input titre à l'ouverture de la modale
    inputTitle.value = "";

    // Afficher message remplissage de tous les champs
    let message = document.querySelector(".modalPhotoMessage");
    message.style.visibility = "visible";
    message.innerHTML = "*Veuillez remplir tous les champs du formulaire.";

    let myForm = document.querySelector(".modalPhotoForm");
    myForm.reset();
})

// Activation bouton Valider
const modalPhotoForm = document.querySelector(".modalPhotoForm");
const submitBtn = document.getElementById("submitBtn");

// Désactiver bouton submit du formulaire
submitBtn.disabled = true;
submitBtn.ariaDisabled = true;

const inputTitle = document.getElementById("title");
const category = document.getElementById("category");

// Valider le champ titre
function checkTitleLength() {    
    if(inputTitle.value.length > 0) return true;
    return false;
}

// Valider le champ catégorie
function checkCategory() {
    if(category.selectedIndex !== 0) return true;
    return false
}

// Valider le champ aperçu de l'image
function checkImage() {
    if(previewImage.style.display !== "none") return true;
    return false;
}

const activateSubmitButton = (e)=> {
    e.preventDefault();
    let message = document.querySelector(".modalPhotoMessage");

    if(checkTitleLength() && checkCategory() && checkImage()) {
        // Bouton du formulaire activé
        submitBtn.disabled = false;
        submitBtn.ariaDisabled = false;
        message.style.visibility = "hidden";    // Cacher le message de remplissage des champs
    } else {
        // Bouton du formulaire désactivé
        submitBtn.disabled = true;
        submitBtn.ariaDisabled = true;
        message.style.visibility = "visible";   // Afficher le message de remplissage des champs
    }
}
modalPhotoForm.addEventListener("change", activateSubmitButton);
modalPhotoForm.category.addEventListener("click", stopPropagation);

// Ajouter un nouveau projet
function createGalleryWork(work) {
    const figure = document.createElement("figure");
    figure.classList.add("project");

    const figureImg = document.createElement("img")
    figureImg.src = work.imageUrl;
    figureImg.alt = work.title;
    figureImg.classList.add("galleryImage");

    const figureCap = document.createElement("figcaption");
    figureCap.innerHTML = work.title;
    figureCap.classList.add("figCaption");

    figure.setAttribute("data-id", work.id);
    figure.setAttribute("category-id", work.categoryId);

    figure.appendChild(figureImg);
    figure.appendChild(figureCap);

    gallery.appendChild(figure);
}

function createModalWork(work) {
    const figure = document.createElement("figure");
    figure.classList.add("modalFigure");
    figure.setAttribute("data-id", work.id);
    figure.setAttribute("category-id", work.categoryId);

    const figureImg = document.createElement("img")
    figureImg.src = work.imageUrl;
    figureImg.alt = work.title;
    figureImg.classList.add("modalImage");

    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-button");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.classList.add("trash-icon");

    trashButton.appendChild(trashIcon);

    figure.appendChild(figureImg);
    figure.appendChild(trashButton);

    galleryModal.appendChild(figure);

    trashButton.addEventListener("click", (e)=> {
        e.preventDefault();
        e.stopPropagation();
        deleteWork(work.id);
    });
}

const addNewWork = (e)=> {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    const inputTitle = document.getElementById("title").value;
    const inputCategory = document.getElementById("category").value;
    const inputImage = document.getElementById("image").files[0];

    if(inputImage.size > 4 * 1024 * 1024) return alert("La taille de l'image ne doit pas dépasser 4mo.");

    const formData = new FormData();

    formData.append("title", inputTitle);
    formData.append("category", inputCategory);
    formData.append("image", inputImage);

    fetch(urlWorks, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(json => {
        createGalleryWork(json);
        createModalWork(json);
        modalPhoto.style.display = "flex";
        const inputs = document.querySelectorAll("input, #previewImage");
        inputs.forEach((input) => {
            input.value = "";
        })
        alert("Nouveau projet ajouté avec succès")
    })
    .catch(err => console.error(err));
}
const submitForm = document.getElementById("submitBtn");
submitForm.addEventListener("click", addNewWork);

// Ajout image preview
const inputFile = document.getElementById("image");
const iconInput = document.querySelector(".fa-image");
const pTag = document.querySelector(".modalPhotoMain p");
const labelTag = document.querySelector(".modalPhotoMain label");

inputFile.addEventListener("change", ()=> {
    const selectedImage = inputFile.files[0];

    const previewImage = document.getElementById("previewImage");

    previewImage.src = URL.createObjectURL(selectedImage);
    previewImage.style.display = "block";

    pTag.style.display = "none";
    labelTag.style.display = "none";
    iconInput.style.display = "none";
});

//Retourner à la modale gallérie
const backModalGalleryBtn = document.querySelector(".backModalGallery");

backModalGalleryBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    e.stopPropagation();

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
    category.selectedIndex = 0;
})

// Fermer modale photo
const closeModalPhotoBtn = document.querySelector(".modalPhotoClose");

closeModalPhotoBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    e.stopPropagation();

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
    category.selectedIndex = 0;
})

// Fermer modale photo avec un clic en dehors de la modale
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
    e.stopPropagation();
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




