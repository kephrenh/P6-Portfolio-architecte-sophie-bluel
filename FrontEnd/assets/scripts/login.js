const apiUrlLogin = "http://localhost:5678/api/users/login";

const email = document.getElementById("email");
const password = document.getElementById("password");
const submitUser = document.getElementById("submit-user");

let user = {
    email: email.value,
    password: password.value,
}

const payload = JSON.stringify(user);

const validate = (e) => {
    e.preventDefault();     //Empêche actualisation de la page

    fetch(apiUrlLogin, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: payload
    })
    .then((response) => response.json())
    .then((data) => {
        sessionStorage.setItem("token", data.token);

        if (data.error) {
            alert("Error username or password");
        } else {
            sessionStorage.setItem("isConnected", JSON.stringify(true));
            window.location.replace("index.html");
        }
    })
};

submitUser.addEventListener("click", validate);

