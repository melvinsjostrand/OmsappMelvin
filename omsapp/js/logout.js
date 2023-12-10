function init(){
    let guid = localStorage.getItem("GUID");
    console.log(guid);

    localStorage.removeItem("GUID");

    console.log(localStorage.getItem("GUID"));

location.href = "account.html";
}
window.onload = init;