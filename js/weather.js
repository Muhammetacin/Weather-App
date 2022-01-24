import { APIkey } from './config.js';

const cityName = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');

async function getCity(cityName) {
    const apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    const response = await fetch(apiString).then(response => response.json());
    console.log(response);
    if(response.cod == 404) {
        console.log(response.message.toUpperCase());
    }
}

const showResult = (event) => {
    if(event.key == "Enter") {
        getCity(cityName.value);
    }
}

cityName.addEventListener('keyup', showResult);
submitBtn.addEventListener('click', (event) => {
    getCity(cityName.value);
})