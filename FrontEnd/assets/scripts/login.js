const loginUrl = "http://localhost:5678/api/users/login";

const form = {
    email : document.getElementById("email"),
    password : document.getElementById("password")
}

const errorMessage = document.querySelector(".errorMessage");
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
        if(response.ok) {
            return response.json();
        } else if(response.status === 404 || response.status === 401) {
            throw new Error("Données d'identifications incorrectes");
        }
    })
    .then(data => {
        sessionStorage.setItem("token", data.token);
        window.location.replace("index.html")
        console.log(data)
    })
}
submitUser.addEventListener("click", login);    
        
