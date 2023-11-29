let organisation = document.getElementsByTagName("main")[0];
let OrganizationList = document.getElementsByTagName("div")[3];
let uppload = document.getElementById("upploadbutton");
let orgInfo = document.getElementsByTagName("section");
let orgId;

    let jsonOrg = [];
    
    //get ids
    var response = jsonOrg;
    var dataIds = response;
    dataIds.forEach(element => console.log(element.orgId));


function init(){
    getOrg();
    verify();
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    orgId = Number(urlParams.get("Id"));

    async function verify(){
    let userverify = "https://omsorgapi.azurewebsites.net/Login/verify";
    let response = await fetch(userverify, {
        headers:{
            "Authorization": localStorage.getItem("GUID")
        }
    });

    let role = await response.text();
    console.log(role);
    if(role === "Du behöver vara inloggad!"){
        location.href = "account.html";
    }
    

    if(role==="Vanlig"){
        uppload.addEventListener("click",event=> {
            location.href = "joinorganisation.html";
        });
    
    }
    else if(role==="Organisation"){  
        uppload.addEventListener("click",event=> {
        location.href = "createorg.html";
        });
    }

    if(role==="Admin"){
        uppload.addEventListener("click",event=> {
            location.href = "role.html";
        });
    
    }
    return role;
}
    if(localStorage.getItem("GUID") === "")
    {
        //Logga in
        location.href= "account.html";

    }
}
window.onload = init;


async function getOrg(){

    let path = "https://omsorgapi.azurewebsites.net/Organization/user";
    jsonOrg = await getOrgFetch(path);
    for(let i=0;i<jsonOrg.length;i++){
        let element = jsonOrg[i];
        orgSection(element);
        CreateOrgList(element);
    }
}



function CreateOrgList(element){
        let Orglist = document.createElement("section");
        let OrgName = document.createTextNode(element.org);
        Orglist.appendChild(OrgName);
        OrganizationList.appendChild(Orglist);

        Orglist.addEventListener("click", event=>{
            location.href = "organisation.html?Id="+ element.orgId;
        });
}

function orgSection(element){
        let Section = document.createElement("section");
         

        if(jsonOrg.image == element.image){
        // Att skapar som backgrund img till
        let OrgImg = element.image;
        console.log(OrgImg);
        Section.style.backgroundImage = "url('OrgImg')";
        }
        else {
          // skapa färger för organisation section 
        let color = Math.floor(Math.random()*16777215).toString(16);
        let colorCode = "#"+color.toString(16);
        Section.style.backgroundColor = colorCode;  
        }
        
        
        

        let Title = document.createElement("p");
        let OrgName = document.createTextNode(element.org);
        Title.appendChild(OrgName);
        Section.appendChild(Title);
        organisation.appendChild(Section);
        

        Section.addEventListener("click", event=>{
            location.href = "organisation.html?Id="+ element.orgId;
        });
}

async function getOrgFetch(path){
    console.log(localStorage.getItem("GUID"));
    let response = await fetch(path, {
        headers:{
            "Authorization": localStorage.getItem("GUID")
        }
    });
    if(response.status === 404){
        
        }
    let json = await response.json();

    return json;
    
}