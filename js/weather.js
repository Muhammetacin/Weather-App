import { APIkey } from './config.js';

let cityNameInput = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementById('cityProperties');

const showCityName = document.getElementById('inputArea').children[0];

async function getCity5Days(cityName) {
    const apiString5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=7&units=metric&appid=" + APIkey;
    const response5Days = await fetch(apiString5Days).then(response => response.json());

    // Contains city name, temp day 1-2-3-4-5-6
    const responseValues = [
        response5Days.city.name,
        response5Days.list[0].main.temp,
        response5Days.list[1].main.temp,
        response5Days.list[2].main.temp,
        response5Days.list[3].main.temp,
        response5Days.list[4].main.temp,
        response5Days.list[5].main.temp,
        response5Days.list[6].main.temp,
    ];

    // Get today's date
    let todaysDate = new Date();
    // Set all the weekdays in app correctly according to today
    getDayAndSetAllDaysOfWeek(todaysDate);

    console.log(response5Days);

    // Show city name on top
    showCityName.textContent = responseValues[0];

    // Show todays temperature
    setTodayTemp(responseValues[1]);

    // cityProperties.children[1].textContent = responseValues[1];
    // cityProperties.children[2].children[1].textContent = responseValues[2];
    // cityProperties.children[2].children[3].textContent = responseValues[3];
    // cityProperties.children[2].children[5].textContent = responseValues[4];
    // cityProperties.children[2].children[7].textContent = responseValues[5];
    // cityProperties.children[2].children[9].textContent = responseValues[6];
    // cityProperties.children[2].children[11].textContent = responseValues[7];
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


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let todaysdate = new Date();

console.log("Today is", daysOfWeek[todaysdate.getDay()]);
console.log("Next day is", daysOfWeek[todaysdate.getDay() + 1]);
console.log("Next day is", daysOfWeek[todaysdate.getDay() + 2]);

function getDayAndSetAllDaysOfWeek(today) {
    console.log("Today is", daysOfWeek[today.getDay()]);

}

function setTodayTemp(todaysTemp) {
    cityProperties.children[1].innerHTML = Math.round(todaysTemp) + "°";
}