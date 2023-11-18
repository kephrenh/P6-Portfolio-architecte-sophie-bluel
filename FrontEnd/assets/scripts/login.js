const loginUrl = "http://localhost:5678/api/users/login";

const form = {
    email : document.getElementById("email"),
    password : document.getElementById("password")
}

const main = document.querySelector("main");
const loginForm = document.getElementById("loginForm");
const submitUser = document.getElementById("submit-user");

// Ajouter fonction login
const login = (e)=> {
    // Arrêter comportement par défaut du submit
    e.preventDefault();

    // Déclarations variables de la fonction
    let user = {
        email: form.email.value,
        password: form.password.value
    }
    
    const payload = JSON.stringify(user);   //Charge utile convertie de valeurs JavaScript à chaîne JSON
    
    // Utiliser fetch méthod post pour envoyer les éléments du formulaire vers l'API
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"},
        body: payload,
    })
    // Traiter la réponse de l'API
    .then(response => {
        if(response.ok) return response.json();
        if(response.status === 404 || response.status === 401) return openDialog();
    })
    // Traiter les données transmises par l'API
    .then(data => {
        sessionStorage.setItem("isLogged", JSON.stringify(true));
        sessionStorage.setItem("token", data.token);    // Associer le nom token à la valeur du token transmise par l'API
        window.location.replace("index.html")           // Rediriger vers le homepage
    })
}
submitUser.addEventListener("click", login);    

// Créer modale pour erreur de connexion
function createErrorDialog() {
    // Ajouter balise dialog 
    const dialog = document.createElement("dialog");
    dialog.classList.add("errorDialog");
    
    // Ajouter le titre de la modale
    const dialogTitle = document.createElement("h2");
    dialogTitle.classList.add("dialogTitle");
    dialogTitle.innerHTML = "Login Failed";

    // Ajouter le message d'erreur
    const dialogText = document.createElement("p");
    dialogText.classList.add("dialogText");
    dialogText.innerHTML = "Invalid email address or password";

    // Ajouter le bouton pour fermeture de la modale
    const dialogButton = document.createElement("i");
    dialogButton.classList.add("dialogButton");
    dialogButton.classList.add("fa-regular");
    dialogButton.classList.add("fa-circle-xmark");

    // Intégrer titre, message, et bouton dans la balise dialog
    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogText);
    dialog.appendChild(dialogButton);

    // Intégrer balise dialog dans main
    main.appendChild(dialog);
}
createErrorDialog();

// Ouverture de la modale
function openDialog() {
    document.querySelector("body").style.overflow = "hidden";       // Empêcher le scroll du body durant l'affichage de la modale
    const errorDialog = document.querySelector(".errorDialog");
    errorDialog.style.display = "flex";     
    errorDialog.showModal();                                        // Ouvres la modale
}

// Fermeture de la modale
const closeDialog = (e)=> {
    e.preventDefault();
    document.querySelector("body").style.overflow = "visible";      // Restaurer le scroll du body à la fermeture de la modale
    const errorDialog = document.querySelector(".errorDialog");
    errorDialog.style.display = "none";     
    errorDialog.close()                                             // Fermer la modale
}

// Ajouter Even Listener au bouton pour invoquer la fermeture de la modale 
const closeButton = document.querySelector(".dialogButton");
closeButton.addEventListener("click", closeDialog);