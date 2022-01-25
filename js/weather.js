import { APIkey } from './config.js';

let cityNameInput = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementById('cityProperties');

const showCityName = document.getElementById('inputArea').children[0];

async function getCity5Days(cityName) {
    const apiString5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=40&units=metric&appid=" + APIkey;
    const response5Days = await fetch(apiString5Days).then(response => response.json());

    if(response5Days.city == undefined) {
        
        return;
    }

    const skyData = [
        response5Days.list[0].weather[0].main,
        response5Days.list[8].weather[0].main,
        response5Days.list[16].weather[0].main,
        response5Days.list[24].weather[0].main,
        response5Days.list[32].weather[0].main,
        response5Days.list[39].weather[0].main,
    ];

    // // Contains city name, temp day 1-2-3-4-5-6-7
    const responseTempValues = [
        response5Days.city.name,
        response5Days.list[0].main.temp,
        response5Days.list[8].main.temp,
        response5Days.list[16].main.temp,
        response5Days.list[24].main.temp,
        response5Days.list[32].main.temp,
        response5Days.list[39].main.temp,
    ];

    // Get today's date
    let todaysDate = new Date();
    // Set all the weekdays in app correctly according to today
    getDayAndSetAllDaysOfWeek(todaysDate);

    console.log(response5Days);

    // Show city name on top
    showCityName.textContent = responseTempValues[0];

    // Show temperature for all days
    setTempAllDays(responseTempValues);

    // Show sky description for all days
    setSkyStatusAllDays(skyData);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



// Events
cityNameInput.addEventListener('keyup', (event) => {
    if(event.key == "Enter") {
        cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
        getCity5Days(cityNameInput.value);
    }
});

submitBtn.addEventListener('click', () => {
    cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
    getCity5Days(cityNameInput.value);
});



const dayNamesOfWeek = document.getElementById('daysOfWeek');

function getDayAndSetAllDaysOfWeek(today) {
    let todayNr = today.getDay() + 2;
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    while(todayNr != 0) {
        let day = daysOfWeek.shift();
        daysOfWeek.push(day);
        todayNr--;
    }

    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[0].innerHTML = daysOfWeek[i + 1];
    }
}

function setTempAllDays(tempData) {
    cityProperties.children[2].innerHTML = Math.round(tempData[1]) + "°";
    
    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[2].innerHTML = Math.round(tempData[i + 2]) + "°";
    }
}

function setSkyStatusAllDays(skyData) {
    cityProperties.children[1].innerHTML = skyData[0];

    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[1].innerHTML = skyData[i + 1];
    }
}