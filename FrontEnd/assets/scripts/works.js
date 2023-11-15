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
    })
}

// Création de la div contenant les boutons
function createFiltersDiv() {
    let filters = document.createElement("div");
    filters.classList.add("filters");

    portfolio.insertBefore(filters, gallery);
}
createFiltersDiv();

// Création et ajout des boutons
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

// Ajout de texte aux boutons
const listFilters = document.querySelectorAll(".btn");

function addFilterBtnTxt() {
    listFilters[0].textContent = "Tous";
    listFilters[1].textContent = "Objets";
    listFilters[2].textContent = "Appartements";
    listFilters[3].textContent = "Hôtels & restaurants";
}
addFilterBtnTxt();

// Ajout de classe aux boutons
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

    works.forEach((work) => {
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "1") return work.style.display = "block";
        return work.style.display = "none";
    });
}
const btnItems = document.querySelector(".btn-items");
btnItems.addEventListener("click", filteredItems);

// Ajout filtre appartements
function filteredApartments() {
    const works = document.querySelectorAll(".project");

    works.forEach((work) => {
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "2") return work.style.display = "block";
        return work.style.display = "none";
    });
}
const btnApartments = document.querySelector(".btn-apartments");
btnApartments.addEventListener("click", filteredApartments);

// Ajout filtre hôtels & restaurants
function filteredHotels() {
    const works = document.querySelectorAll(".project");

    works.forEach((work) => {
        const categoryId = work.getAttribute("category-id");
        if (categoryId === "3") return work.style.display = "block";
        return work.style.display = "none";
    });
}
const btnHotels = document.querySelector(".btn-hotels");
btnHotels.addEventListener("click", filteredHotels);

// Ajout filre Tous
function noFilter() {
    const works = document.querySelectorAll(".project");
    works.forEach((work) => {
        work.style.display = "block";
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

window.addEventListener("load", noFilter);
window.addEventListener("load", defaultFilter);

//Modification style des filtres après sélection
filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
        filterBtns[0].classList.remove("btn_selected");
        if (i === 1) return filterBtn.classList.add("btn_selected");

        filterBtns[1].classList.remove("btn_selected");
        if (i === 2) return filterBtn.classList.add("btn_selected");

        filterBtns[2].classList.remove("btn_selected");
        if (i === 3) return filterBtn.classList.add("btn_selected");

        filterBtns[3].classList.remove("btn_selected");
        if (i === 0) return filterBtn.classList.add("btn_selected");
    })
})

// Logout
const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", handleLogout);

//Comportement de Homepage après connexion administrateur
const loginStatus = document.querySelector(".login");
const logoutStatus = document.querySelector(".logout");
const editModeBar = document.getElementById("admin-mode-bar");
const editModeButton = document.querySelector(".portfolioButton");
const editModeFilter = document.querySelector(".filters");

if (JSON.parse(sessionStorage.getItem("isLogged"))) {
    loginStatus.style.display = "none";
    logoutStatus.style.display = "initial";
    editModeBar.style.display = "flex";
    editModeButton.style.display = "flex";
    editModeFilter.style.display = "none";
    modalGallery.style.display = "none";
    modalPhoto.style.display = "none";
} else {
    loginStatus.style.display = "initial";
    logoutStatus.style.display = "none";
    editModeBar.style.display = "none";
    editModeButton.style.display = "none";
    editModeFilter.style.display = "flex";
    modalGallery.style.display = "none";
    modalPhoto.style.display = "none";
}



