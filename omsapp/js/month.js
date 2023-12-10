let month;
let datum;
let year;
let forValue = 0;
let firstSection;
let mediaQuery;
let currentDate;
let currentWeek;
const months = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"];
let monthInfo=[];
let arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthColors = ["#386C9D", "#FFAA00", "#CB423F", "#74BB41"]; /*BLÅ Dec - Feb | GUL Mars  Maj | RÖD Sep - Nov | GRÖN Juni - Aug*/

let color = "#FFFFFF";

function init(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    verify();
    if(document.body.style.backgroundColor === color){
        monthColor();
    }else{
        monthColor();
    }
    month = Number(urlParams.get("months"));
    monthColor();
    mediaQuery = window.matchMedia('(min-width: 1080px)');

    window.addEventListener("resize", handleTabletChange);
   
    year = Number(urlParams.get("y"));
    if(month === 0){
        let day = new Date();
        month = day.getMonth() + 1;
        year = Number(day.getFullYear().toString().substring(2,4));
        console.log(year);
    }
    
    currentDate = new Date();
    currentWeek = getWeekNumber(currentDate);
    console.log("Veckonumret är " + currentWeek);

    console.log(month);
    getMonth();

    let rightArrow = document.getElementById("rightArrowImage");
    rightArrow.addEventListener("click", event=>{
        month++;
        if(month > 12){
            month = 1;
            year++;
        } 
         
        location.href = "month.html?y=" + year+ "&months=" + month;   
    }) 

    let leftArrow = document.getElementById("leftArrowImage");
    leftArrow.addEventListener("click", event=>{
        month--;
        if(month<1){
            month = 12;
            year--;
        } 
        location.href = "month.html?y=" + year+ "&months=" + month;
    })  


}
 window.onload = init;

 async function getMonth(){
    datum = document.getElementById("date");

    console.log(month);
    console.log(year);

    let path = "https://omsorgapi.azurewebsites.net/Activity/"+ year +"/" + month;

    monthInfo = await getMonthFetch(path);

    createHeader();
    for(let i = 0; i < monthInfo.length; i++){
        forValue = i;   
        createSection(i+1);
    }
    firstSection = document.querySelector("section:first-of-type");
    console.log("First: " + firstSection);
    handleTabletChange();
 }

function monthColor(){
    if(month === 1 || month === 2 || month === 12){
        document.body.style.backgroundColor = "#386C9D";
    }
    if(month === 3 || month === 4 || month === 5){
        document.body.style.backgroundColor = "#FFAA00";
    }
    if(month === 6 || month === 7 || month === 8){
        document.body.style.backgroundColor = "#CB423F";
    }
    if(month === 9 || month === 10 || month === 11){
        document.body.style.backgroundColor = "#74BB41";
    }
}
 function createSection(cont) {

    let section = document.createElement("section");
    let mainDateElem = document.getElementById("date");
    let paragraph = document.createElement("p");
    
    let date = monthInfo[forValue].day + " "+ cont + "/" + month;



    if(monthInfo[forValue].day === "Monday"){
        let displayDay = "Måndag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Tuesday"){
        let displayDay = "Tisdag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Wednesday"){
        let displayDay = "Onsdag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Thursday"){
        let displayDay = "Torsdag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Friday"){
        let displayDay = "Fredag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Saturday"){
        let displayDay = "Lördag";
        date = displayDay + " "+ cont + "/" + month;

    }
    if(monthInfo[forValue].day === "Sunday"){
        let displayDay = "Söndag";
        date = displayDay + " "+ cont + "/" + month;

    }

    let text = document.createTextNode(date);
    paragraph.appendChild(text);
    section.appendChild(paragraph);
    
    monthInfo[cont-1].activities.forEach(element=>{
        paragraph = document.createElement("p");
        text = document.createTextNode(element.org);
        paragraph.appendChild(text);
        section.appendChild(paragraph);
    })
    
    datum.appendChild(section);
    section.style.cursor = "pointer";
    section.addEventListener("click",event=> {
        location.href="information.html?m="+month+"&d="+cont;
    })

    if(monthInfo[forValue].day === "Monday"){
        section.style.backgroundColor = "#92D14F";
    }
    if(monthInfo[forValue].day === "Tuesday"){
        section.style.backgroundColor = "#92CDDB";
    }
    if(monthInfo[forValue].day === "Wednesday"){
        section.style.backgroundColor = "#FEFEFE";
    }
    if(monthInfo[forValue].day === "Thursday"){
        section.style.backgroundColor = "#C88F58";
    }
    if(monthInfo[forValue].day === "Friday"){
        section.style.backgroundColor = "#FEFE6C";
    }
    if(monthInfo[forValue].day === "Saturday"){
        section.style.backgroundColor = "#F9A7D7";
    }
    if(monthInfo[forValue].day === "Sunday"){
        section.style.backgroundColor = "#D65156";
    }
}
function createHeader(Text){
    let headers = document.getElementsByTagName("h2");
    headers[0].innerHTML = months[month-1];
}

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
}

function handleTabletChange(){
    console.log("Resize");
    if(window.matchMedia('(min-width: 1080px)').matches){
        for(let i = 0;i<arr.length;i++){
            console.log(monthInfo[0].day);
            if(arr[i]===monthInfo[0].day){
                console.log("i= " + i);
                firstSection.style.gridColumn = i+1;
            }
        }
    }else{
        firstSection.style.gridColumn = null;
    }
}
async function getMonthFetch(path){
    console.log(localStorage.getItem("GUID"));
    let response = await fetch(path, {
        headers:{
            "Authorization": localStorage.getItem("GUID")
        }
    });
    let json = await response.json();
    return json;
}

function getWeekNumber(weekDate){
    let target = new Date(weekDate.valueOf());
    target.setDate(target.getDate() + 3 - (target.getDay() + 6) % 7);
    
    let weekNumber = 1 + Math.floor((target - new Date(target.getFullYear(), 0, 4)) / 604800000);
    return weekNumber;
}