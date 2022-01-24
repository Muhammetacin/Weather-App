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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearCityProperties() {
    // cityProperties[0].parentElement.children[0].innerHTML = "Temperature";
    cityProperties[0].children[0].innerHTML = "Temperature";
    cityProperties[0].children[1].innerHTML = "Feels like";
    cityProperties[0].children[2].innerHTML = "Temp_min";
    cityProperties[0].children[3].innerHTML = "Temp_max";
    cityProperties[0].children[4].innerHTML = "Pressure";
    cityProperties[0].children[5].innerHTML = "Humidity";

    // for(let property = 0; property < cityProperties.length; property++) {
    //         cityProperties[0].children[property].innerHTML = "";
    // }
}

cityNameInput.addEventListener('keyup', (event) => {
    if(event.key == "Enter") {
        cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
        getCity(cityNameInput.value);
    }
});
submitBtn.addEventListener('click', () => {
    cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
    getCity(cityNameInput.value);
});