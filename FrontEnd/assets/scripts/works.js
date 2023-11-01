const apiUrl = "http://www.localhost:5678/api/works";

let i = 0;

// Récupération des travaux depuis le back-end
const portfolio = document.getElementById("portfolio");

const gallery = document.querySelector(".gallery");

fetch(apiUrl)
    .then(response => response.json())  //conversion en json
    .then(json => getWorks(json))    //affichage des travaux
    .catch(err => console.log("Request Failed", err))  //catch erreurs

function getWorks(works) {

    works.forEach((work) => {

        const figure = document.createElement("figure");
        figure.classList.add("project");

        const figureImg = document.createElement("img")
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;

        const figureCap = document.createElement("figcaption");
        figureCap.innerHTML = work.title;

        figure.setAttribute("data-id", work.id);
        figure.setAttribute("category-id", work.categoryId);

        figure.appendChild(figureImg);
        figure.appendChild(figureCap);

        gallery.appendChild(figure);
    })
}
