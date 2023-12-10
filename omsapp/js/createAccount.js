let form;
let togglePassword1 = document.getElementById("togglePassword1");
let togglePassword2 = document.getElementById("togglePassword2");
function init(){

    togglePassword1.addEventListener("click", event=>{
        passwordToggler1();
    });

    togglePassword2.addEventListener("click", event=>{
        passwordToggler2();
    });

    form = document.querySelector("form");

    form.addEventListener("submit", event=>{
        getFormData();
        event.preventDefault();
    });
}

window.onload = init;

async function getFormData(){
    let email = form.elements.createaccemail.value;
    let phonenumber = form.elements.createaccphonenumber.value;
    let password = form.elements.createaccpassword.value;
    let repeatedPassword = form.elements.repeatpassword.value;

    if(repeatedPassword != password){
        let errorPassword = document.getElementById("errorPasswordMessage");
        errorPassword.innerHTML = "Lösenordet matchar inte.";
        return null;
    } 
    Json = {
        "mail":email,
        "phone":phonenumber
        }        
    let status = await postFetch(Json);    
}

async function postFetch(json){
    let path = "https://omsorgapi.azurewebsites.net/Login";
    let password = form.elements.createaccpassword.value;
    let username = form.elements.createaccusername.value;
    console.log(username);
    console.log(password);
    const response = await fetch(path ,{
        method:"POST",
        mode:"cors",
        headers:{
            "content-type":"application/json",
          "Authorization": "Basic: " + btoa(username+":"+password)
        },
        body:JSON.stringify(json)
    })
    if(response.status === 201){
        location.href = "index.html";
    }
   return response.status;
}

function passwordToggler1(){
    let passwordInput = document.getElementById("createaccpassword");
    
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    }else{
        passwordInput.type = "password";
    }
}

function passwordToggler2(){
    let passwordInput = document.getElementById("repeatpassword");
    
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    }else{
        passwordInput.type = "password";
    }
}