const loginUrl = "http://localhost:5678/api/users/login";

const form = {
    email : document.getElementById("email"),
    password : document.getElementById("password")
}

const main = document.querySelector("main");
const loginForm = document.getElementById("loginForm");
const submitUser = document.getElementById("submit-user");

const login = (e)=> {
    e.preventDefault();

    let user = {
        email: form.email.value,
        password: form.password.value
    }
    console.log(user);
    
    const payload = JSON.stringify(user);
    
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"},
        body: payload,
    })
    .then(response => {
        if(response.ok) return response.json();
        if(response.status === 404 || response.status === 401) return openDialog();
    })
    .then(data => {
        sessionStorage.setItem("isLogged", JSON.stringify(true));
        sessionStorage.setItem("token", data.token);
        window.location.replace("index.html")
    })
}
submitUser.addEventListener("click", login);    
        
function createErrorDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("errorDialog");
    
    const dialogTitle = document.createElement("h2");
    dialogTitle.classList.add("dialogTitle");
    dialogTitle.innerHTML = "Login Failed";

    const dialogText = document.createElement("p");
    dialogText.classList.add("dialogText");
    dialogText.innerHTML = "Invalid email address or password";

    const dialogButton = document.createElement("i");
    dialogButton.classList.add("dialogButton");
    dialogButton.classList.add("fa-regular");
    dialogButton.classList.add("fa-circle-xmark");

    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogText);
    dialog.appendChild(dialogButton);

    main.appendChild(dialog);
}
createErrorDialog();

function openDialog() {
    document.querySelector("body").style.overflow = "hidden";
    const errorDialog = document.querySelector(".errorDialog");
    errorDialog.style.display = "flex";
    errorDialog.showModal();
}

const closeDialog = (e)=> {
    e.preventDefault();
    document.querySelector("body").style.overflow = "visible";
    const errorDialog = document.querySelector(".errorDialog");
    errorDialog.style.display = "none";
    errorDialog.close()
}
const closeButton = document.querySelector(".dialogButton");
closeButton.addEventListener("click", closeDialog);