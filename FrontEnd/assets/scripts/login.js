const loginUrl = "http://localhost:5678/api/users/login";



const form = {
    email : document.getElementById("email"),
    password : document.getElementById("password")
}

const errorMessage = document.querySelector(".errorMessage");
const submitUser = document.getElementById("submit-user");
const bearerAuth = sessionStorage.getItem("BearerAuth");

let user = {
    email: form.email.value,
    password: form.password.value
}
console.log(user);

const payload = JSON.stringify(user);

const login = (e)=> {
    e.preventDefault();

    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-type" : "application/json"},
        body: payload,
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else if(response.status === 404 || response.status === 401) {
            throw new Error("Données d'identifications incorrectes");
        }
    })
    .then(data => {
        window.sessionStorage.setItem("token", data.token);
        window.location.replace("index.html")
        console.log(data)
    })
}
submitUser.addEventListener("click", login);    
        
