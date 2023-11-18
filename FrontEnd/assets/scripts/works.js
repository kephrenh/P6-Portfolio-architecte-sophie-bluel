const apiUrl = "http://www.localhost:5678/api/works";

let i = 0;

// Récupération des travaux depuis le back-end
const portfolio = document.getElementById("portfolio");

const gallery = document.querySelector(".gallery");

fetch(apiUrl)
    .then(response => response.json())  
    .then(json => getWorks(json))   
    .catch(err => console.log("Request Failed", err))  

function getWorks(works) {

    works.forEach((work) => {

    // Créer balise figure
    const figure = document.createElement("figure");
    figure.classList.add("project");
    figure.setAttribute("data-id", work.id);
    figure.setAttribute("category-id", work.categoryId);

    // Créer balise image
    const figureImg = document.createElement("img")
    figureImg.src = work.imageUrl;
    figureImg.alt = work.title;
    figureImg.classList.add("galleryImage");

    // Créer balise figcaption
    const figureCap = document.createElement("figcaption");
    figureCap.innerHTML = work.title;
    figureCap.classList.add("figCaption");

    // Intégrer img et figcaption à figure
    figure.appendChild(figureImg);
    figure.appendChild(figureCap);

    // Intégrer figure à la gallérie
    gallery.appendChild(figure);
    })
}

// Intégration section Filtres
function createFiltersDiv() {
    let filters = document.createElement("div");
    filters.classList.add("filters");

    portfolio.insertBefore(filters, gallery);
}
createFiltersDiv();

// Créer et ajouter les boutons filtre
function createFiltersBtns() {

    for (let i = 0; i < 4; i++) {
        let filters = document.querySelector(".filters");

        const filterBtn = document.createElement("button");
        filterBtn.classList.add("btn");

        const lineBreak = document.createElement("br");

        filters.appendChild(filterBtn);
        filters.appendChild(lineBreak);
    }
}
createFiltersBtns();

// Ajouter le texte des filtres
const listFilters = document.querySelectorAll(".btn");

function addFilterBtnTxt() {
    listFilters[0].textContent = "Tous";
    listFilters[1].textContent = "Objets";
    listFilters[2].textContent = "Appartements";
    listFilters[3].textContent = "Hôtels & restaurants";
}
addFilterBtnTxt();

// Ajouter la classe des filtres
function addFilterBtnClass() {
    listFilters[0].classList.add("btn-all");
    listFilters[1].classList.add("btn-items");
    listFilters[2].classList.add("btn-apartments");
    listFilters[3].classList.add("btn-hotels");
}
addFilterBtnClass();

// Ajout filtre objets
function filteredItems() {
    const works = document.querySelectorAll(".project");
    works.forEach((work) => {                                           // Boucle forEach pour prendre chaque élément de la gallérie
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "1") return work.style.display = "block";    // Afficher Objets
        return work.style.display = "none";                             // Masquer les autres éléments
    });
}
const btnItems = document.querySelector(".btn-items");
btnItems.addEventListener("click", filteredItems);

// Ajout filtre appartements
function filteredApartments() {
    const works = document.querySelectorAll(".project");

    works.forEach((work) => {
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "2") return work.style.display = "block";    // Afficher Appartements
        return work.style.display = "none";                             //  Masquer les autres éléments
    });
}
const btnApartments = document.querySelector(".btn-apartments");
btnApartments.addEventListener("click", filteredApartments);

// Ajout filtre hôtels & restaurants
function filteredHotels() {
    const works = document.querySelectorAll(".project");

    works.forEach((work) => {
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "3") return work.style.display = "block";    // Afficher Hôtels & restaurants
        return work.style.display = "none";                             // Masquer les autres éléments
    });
}
const btnHotels = document.querySelector(".btn-hotels");
btnHotels.addEventListener("click", filteredHotels);

// Ajout filre Tous
function noFilter() {
    const works = document.querySelectorAll(".project");
    works.forEach((work) => {
        work.style.display = "block";       // Afficher tous les travaux
    });
}
const btnAll = document.querySelector(".btn-all");
btnAll.addEventListener("click", noFilter);

// Changement aspect des boutons filtre au click
const filterBtns = document.querySelectorAll(".filters .btn");
const nbFilterBtn = filterBtns.length;

const filterBtn = filterBtns[i];

// Filtre Tous sélectionné par défaut au chargement de la page
function defaultFilter() {
    filterBtns[0].classList.add("btn_selected");
}

//Filtre Tous sélectionné par défaut au chargement de la page
window.addEventListener("load", noFilter);  
window.addEventListener("load", defaultFilter);     


//Modification style des filtres après sélection
filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
        for(let i = 0; i < filterBtns.length; i++) {
            filterBtns[i].classList.remove("btn_selected");     // Retirer la classe btn_selected de tous les boutons
        }
        filterBtn.classList.add("btn_selected");                // Ajouter la classe btn_selected au bouton
    })
})


// Logout
const handleLogout = () => {
    window.sessionStorage.clear();      // Vider session storage
    window.location.reload(true);       // Actualiser la page
    window.location.replace('/');
  };
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", handleLogout);

//Gestion Homepage connexion/hors connextion
const loginStatus = document.querySelector(".login");
const logoutStatus = document.querySelector(".logout");
const editModeBar = document.getElementById("admin-mode-bar");
const editModeButton = document.querySelector(".portfolioButton");
const editModeFilter = document.querySelector(".filters");
const portfolioHeader = document.querySelector(".portfolio-header");

if (JSON.parse(sessionStorage.getItem("isLogged"))) {
    // Utilisateur connecté
    loginStatus.style.display = "none";             // login masqué
    logoutStatus.style.display = "initial";         // logout affiché
    editModeBar.style.display = "flex";             // Barre "Mode édition" affiché
    editModeButton.style.display = "flex";          // Bouton "modifier" affiché
    editModeFilter.style.display = "none";          // Filtres masqués
    portfolioHeader.style.marginBottom = "75px";    // Augmenter margin bottom 
    modalGallery.style.display = "none";            // Modale gallérie masquée
    modalPhoto.style.display = "none";              // Modale ajout photo masquée
} else {
    // Utilisateur déconnecté
    loginStatus.style.display = "initial";          // login affiché
    logoutStatus.style.display = "none";            // logout masqué
    editModeBar.style.display = "none";             // Barre "Mode édition" masqué
    editModeButton.style.display = "none";          // Bouton "modifier" masqué
    editModeFilter.style.display = "flex";          // Filtres affichés
    modalGallery.style.display = "none";            // Modale gallérie cachée
    modalPhoto.style.display = "none";              // Modale ajout photo cachée
}



