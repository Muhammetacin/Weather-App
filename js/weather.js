import { APIkey } from './config.js';

let cityNameInput = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementsByClassName('card-text');



async function getCity(cityName) {
    const apiString = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" + cityName + "&appid=" + APIkey;
    const response = await fetch(apiString).then(response => response.json());
    
    // If input is not found return a error message
    if(response.cod == 404 || cityNameInput.value == "") {
        console.log(response.message.toUpperCase());
        cityProperties[0].parentElement.children[0].innerHTML = response.message.toUpperCase();
        return;
    }

    console.log(response);

    const properties = [
        response.name, 
        response.main.temp, 
        response.main.feels_like, 
        response.main.temp_min, 
        response.main.temp_max, 
        response.main.pressure, 
        response.main.humidity
    ];
    
    // Clear previous values
    clearCityProperties();
    
    // Set city name in card
    cityProperties[0].parentElement.children[0].innerHTML = properties[0];

    // Set city weather properties in card
    for(let property = 0; property < properties.length - 1; property++) {
        if(property == 4 || property == 5) {
            cityProperties[0].children[property].innerHTML += ": " + properties[property + 1];
        } else {
            cityProperties[0].children[property].innerHTML += ": " + properties[property + 1] + "°C";
        }
    }

}

async function getCity5Days(cityName) {
    const apiString5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=" + APIkey;
    const response5Days = await fetch(apiString5Days).then(response => response.json());

    const firstCard = cityProperties[0].children;
    cityProperties[0].parentElement.children[0].textContent = response5Days.city.name;
    firstCard[0].textContent = "Temperature Day 1: " + response5Days.list[0].main.temp + " °C";
    firstCard[1].textContent = "Temperature Day 2: " + response5Days.list[1].main.temp + " °C";
    firstCard[2].textContent = "Temperature Day 3: " + response5Days.list[2].main.temp + " °C";
    firstCard[3].textContent = "Temperature Day 4: " + response5Days.list[3].main.temp + " °C";
    firstCard[4].textContent = "Temperature Day 5: " + response5Days.list[4].main.temp + " °C";

    console.log(response5Days);
    console.log("City name: " + response5Days.city.name);
    console.log("Temperature Day 1: " + response5Days.list[0].main.temp);
    console.log("Temperature Day 2: " + response5Days.list[1].main.temp);
    console.log("Temperature Day 3: " + response5Days.list[2].main.temp);
    console.log("Temperature Day 4: " + response5Days.list[3].main.temp);
    console.log("Temperature Day 5: " + response5Days.list[4].main.temp);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearCityProperties() {
    cityProperties[0].children[0].innerHTML = "Temperature";
    cityProperties[0].children[1].innerHTML = "Feels like";
    cityProperties[0].children[2].innerHTML = "Temp_min";
    cityProperties[0].children[3].innerHTML = "Temp_max";
    cityProperties[0].children[4].innerHTML = "Pressure";
    cityProperties[0].children[5].innerHTML = "Humidity";
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