import APIkey from './config.js';
import { UNSPLASH_API_KEY } from './config.js';
import { myChart ,drawGraph } from './graph.js';
import { showVisitedCities } from './visitedCitiesFunctions.js';

const cityNameInput = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementById('cityProperties');
const dayNamesOfWeek = document.getElementById('daysOfWeek');
const showCityName = document.getElementById('inputArea').children[0];
const cityImage = document.getElementById('cityImg');

// Get todays day
const todaysDate = new Date().getDay();

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const resetCityValues = () => {
    cityProperties.children[1].innerHTML = "-";
    cityProperties.children[2].innerHTML = "-";

    for(let j = 1; j < 3; j++) {
        for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
            dayNamesOfWeek.children[i].children[j].innerHTML = "-";
        }
    }

    cityImage.src = "";
};

const setDayNames = (today) => {
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Rearrange the array
    while(today != 0) {
        let day = daysOfWeek.shift();
        daysOfWeek.push(day);
        today--;
    }

    // Show correct day names on page
    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[0].innerHTML = daysOfWeek[i + 1];
    }

    return daysOfWeek;
};

const setTemperatureOfDays = (temperatureData) => {
    let temperatures = [];
    
    const todaysTemperature = Math.round(temperatureData[0]);
    temperatures.push(todaysTemperature);

    cityProperties.children[2].innerHTML = todaysTemperature + "°";
    
    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[2].innerHTML = Math.round(temperatureData[i + 1]) + "°";
        temperatures.push(Math.round(temperatureData[i + 1]));
    }

    return temperatures;
};

const setWeatherDescriptionOfDays = (weatherDescription) => {
    cityProperties.children[1].innerHTML = weatherDescription[0];

    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[1].innerHTML = weatherDescription[i + 1];
    }
};

const setCityProperties = (responseCityName, responseTemperatureValues, weatherDescription) => {
    // Set all the weekdays in app correctly according to day
    setDayNames(todaysDate);

    // Show city name on top
    showCityName.textContent = responseCityName;

    // Show temperature for all days
    setTemperatureOfDays(responseTemperatureValues);

    // Show sky description for all days
    setWeatherDescriptionOfDays(weatherDescription);
};

const createGraphWithValues = (responseTemperatureValues) => {
    const temperatures = setTemperatureOfDays(responseTemperatureValues);
    const dayLabels = setDayNames(todaysDate);
    dayLabels.pop();

    drawGraph(dayLabels, temperatures);
};

const fetchCityTemperature5Days = async (cityName) => {
    const apiString5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=40&units=metric&appid=" + APIkey;
    const response5Days = await fetch(apiString5Days).then(response => response.json());

    if(response5Days.city == undefined) {
        showCityName.textContent = "City not found";
        return;
    }

    const responseCityName = response5Days.city.name;

    const weatherDescription = [
        response5Days.list[0].weather[0].main,
        response5Days.list[8].weather[0].main,
        response5Days.list[16].weather[0].main,
        response5Days.list[24].weather[0].main,
        response5Days.list[32].weather[0].main,
        response5Days.list[39].weather[0].main,
    ];

    const responseTemperatureValues = [
        response5Days.list[0].main.temp,
        response5Days.list[8].main.temp,
        response5Days.list[16].main.temp,
        response5Days.list[24].main.temp,
        response5Days.list[32].main.temp,
        response5Days.list[39].main.temp,
    ];

    return { responseCityName, weatherDescription, responseTemperatureValues };
};

const fetchCityImage = async (cityName) => {
    const url = "https://api.unsplash.com/search/photos?query=" + cityName + "&client_id=" + UNSPLASH_API_KEY;
    const getImage = await fetch(url).then(response => response.json());
    
    cityImage.src = getImage.results[0].urls.regular;
};

const executeInput = () => {
    let inputValue = capitalizeFirstLetter(cityNameInput.value);
    let fetchCity = fetchCityTemperature5Days(inputValue);
    fetchCityImage(inputValue);

    fetchCity.then(cityObject => setCityProperties(cityObject.responseCityName, cityObject.responseTemperatureValues, cityObject.weatherDescription));
    fetchCity.then(cityObject => createGraphWithValues(cityObject.responseTemperatureValues));
    fetchCity.then(cityObject => showVisitedCities(cityObject.responseCityName));
};



// Events
cityNameInput.addEventListener('keyup', (event) => {
    resetCityValues();
    
    if(myChart != null)
    myChart.destroy();
    
    if(event.key == "Enter") {
        executeInput();
    }
});

submitBtn.addEventListener('click', () => {
    executeInput();
});