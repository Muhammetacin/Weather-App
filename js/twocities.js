import APIkey from './config.js';
import { UNSPLASH_API_KEY } from './config.js';

const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementById('cityProperties');
const dayNamesOfWeek1 = document.getElementById('daysOfWeek1');
const dayNamesOfWeek2 = document.getElementById('daysOfWeek2');
const cityName1Input = document.getElementById('inputField1');
const cityName2Input = document.getElementById('inputField2');
const showCity1Name = document.getElementById('inputArea').children[0].children[0];
const showCity2Name = document.getElementById('inputArea').children[2].children[0];
const cityImage1 = document.getElementById('cityImg1');
const cityImage2 = document.getElementById('cityImg2');

let visitedCities1 = [];
let visitedCities2 = [];

async function getCity5Days(cityName1, cityName2) {
    const apiString5DaysCity1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName1 + "&cnt=40&units=metric&appid=" + APIkey;
    const response5DaysCity1 = await fetch(apiString5DaysCity1).then(response => response.json());
    
    const apiString5DaysCity2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName2 + "&cnt=40&units=metric&appid=" + APIkey;
    const response5DaysCity2 = await fetch(apiString5DaysCity2).then(response => response.json());

    if(response5DaysCity1.city == undefined && response5DaysCity2.city != undefined) {
        showCity1Name.textContent = "Please select a city";
        return;
    } else
    if(response5DaysCity1.city != undefined && response5DaysCity2.city == undefined) {
        showCity2Name.textContent = "Please select a city";
        return;
    } else
    if(response5DaysCity1.city == undefined || response5DaysCity2.city == undefined) {
        showCity1Name.textContent = "City not found";
        showCity2Name.textContent = "City not found";
        return;
    }

    const skyDataCity1 = [
        response5DaysCity1.list[0].weather[0].main,
        response5DaysCity1.list[8].weather[0].main,
        response5DaysCity1.list[16].weather[0].main,
        response5DaysCity1.list[24].weather[0].main,
        response5DaysCity1.list[32].weather[0].main,
        response5DaysCity1.list[39].weather[0].main,
    ];

    const responseTempValuesCity1 = [
        response5DaysCity1.city.name,
        response5DaysCity1.list[0].main.temp,
        response5DaysCity1.list[8].main.temp,
        response5DaysCity1.list[16].main.temp,
        response5DaysCity1.list[24].main.temp,
        response5DaysCity1.list[32].main.temp,
        response5DaysCity1.list[39].main.temp,
    ];
    
    const skyDataCity2 = [
        response5DaysCity2.list[0].weather[0].main,
        response5DaysCity2.list[8].weather[0].main,
        response5DaysCity2.list[16].weather[0].main,
        response5DaysCity2.list[24].weather[0].main,
        response5DaysCity2.list[32].weather[0].main,
        response5DaysCity2.list[39].weather[0].main,
    ];

    const responseTempValuesCity2 = [
        response5DaysCity2.city.name,
        response5DaysCity2.list[0].main.temp,
        response5DaysCity2.list[8].main.temp,
        response5DaysCity2.list[16].main.temp,
        response5DaysCity2.list[24].main.temp,
        response5DaysCity2.list[32].main.temp,
        response5DaysCity2.list[39].main.temp,
    ];

    // Get today's date
    let todaysDate = new Date();
    // Set all the weekdays in app correctly according to today
    getDayAndSetAllDaysOfWeek(todaysDate);

    // Show city name on top
    const city1Label = responseTempValuesCity1[0];
    const city2Label = responseTempValuesCity2[0];
    showCity1Name.textContent = city1Label;
    showCity2Name.textContent = city2Label;

    // Show temperature for all days
    setTempAllDays(responseTempValuesCity1);
    setTempAllDays2(responseTempValuesCity2);

    // Show sky description for all days
    setSkyStatusAllDays(skyDataCity1);
    setSkyStatusAllDays2(skyDataCity2);

    const temperatures = setTempAllDays(responseTempValuesCity1);
    const temperatures2 = setTempAllDays2(responseTempValuesCity2);
    const dayLabels = getDayAndSetAllDaysOfWeek(todaysDate);
    dayLabels.pop();

    drawGraph(dayLabels, temperatures, temperatures2, city1Label, city2Label);

    visitedCities1.push(responseTempValuesCity1[0]);
    visitedCities1 = visitedCities1.filter((value, index, city) => city.indexOf(value) === index);
    
    visitedCities2.push(responseTempValuesCity2[0]);
    visitedCities2 = visitedCities2.filter((value, index, city) => city.indexOf(value) === index);

    createVisitedCitiesListItem(visitedCities1);
    createVisitedCitiesListItem2(visitedCities2);
}

// async function getCity5Days(cityName2) {
//     const apiString5DaysCity2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName2 + "&cnt=40&units=metric&appid=" + APIkey;
//     const response5DaysCity2 = await fetch(apiString5DaysCity2).then(response => response.json());

//     if(response5DaysCity2.city != undefined) {
//         showCity2Name.textContent = "Please select a city";
//         return;
//     }
    
//     const skyDataCity2 = [
//         response5DaysCity2.list[0].weather[0].main,
//         response5DaysCity2.list[8].weather[0].main,
//         response5DaysCity2.list[16].weather[0].main,
//         response5DaysCity2.list[24].weather[0].main,
//         response5DaysCity2.list[32].weather[0].main,
//         response5DaysCity2.list[39].weather[0].main,
//     ];

//     const responseTempValuesCity2 = [
//         response5DaysCity2.city.name,
//         response5DaysCity2.list[0].main.temp,
//         response5DaysCity2.list[8].main.temp,
//         response5DaysCity2.list[16].main.temp,
//         response5DaysCity2.list[24].main.temp,
//         response5DaysCity2.list[32].main.temp,
//         response5DaysCity2.list[39].main.temp,
//     ];

//     // Get today's date
//     let todaysDate = new Date();
//     // Set all the weekdays in app correctly according to today
//     getDayAndSetAllDaysOfWeek(todaysDate);

//     // Show city name on top
//     showCity2Name.textContent = responseTempValuesCity2[0];

//     // Show temperature for all days
//     setTempAllDays2(responseTempValuesCity2);

//     // Show sky description for all days
//     setSkyStatusAllDays2(skyDataCity2);

//     const temperatures2 = setTempAllDays2(responseTempValuesCity2);
//     const dayLabels = getDayAndSetAllDaysOfWeek(todaysDate);
//     dayLabels.pop();

//     drawGraph(dayLabels, temperatures, temperatures2);

//     visitedCities1.push(responseTempValuesCity1[0]);
//     visitedCities1 = visitedCities1.filter((value, index, city) => city.indexOf(value) === index);

//     createVisitedCitiesListItem(visitedCities1);
// }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDayAndSetAllDaysOfWeek(today) {
    let todayNr = today.getDay();
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    while(todayNr != 0) {
        let day = daysOfWeek.shift();
        daysOfWeek.push(day);
        todayNr--;
    }

    for(let i = 0; i < dayNamesOfWeek1.children.length; i++) {
        dayNamesOfWeek1.children[i].children[0].innerHTML = daysOfWeek[i + 1];
    }

    for(let i = 0; i < dayNamesOfWeek2.children.length; i++) {
        dayNamesOfWeek2.children[i].children[0].innerHTML = daysOfWeek[i + 1];
    }

    return daysOfWeek;
}

function setTempAllDays(tempData1) {
    let temperatures1 = [];
    
    const todaysTemperature1 = Math.round(tempData1[1]);

    temperatures1.push(todaysTemperature1);

    cityProperties.children[0].children[2].innerHTML = todaysTemperature1 + "°";
    
    for(let i = 0; i < dayNamesOfWeek1.children.length; i++) {
        dayNamesOfWeek1.children[i].children[2].innerHTML = Math.round(tempData1[i + 2]) + "°";
        temperatures1.push(Math.round(tempData1[i + 2]));
    
    }

    return temperatures1;
}

function setTempAllDays2(tempData2) {
    let temperatures2 = [];
    
    const todaysTemperature2 = Math.round(tempData2[1]);
    temperatures2.push(todaysTemperature2);

    cityProperties.children[1].children[2].innerHTML = todaysTemperature2 + "°";
    
    for(let i = 0; i < dayNamesOfWeek2.children.length; i++) {
        dayNamesOfWeek2.children[i].children[2].innerHTML = Math.round(tempData2[i + 2]) + "°";
        temperatures2.push(Math.round(tempData2[i + 2]));
    }

    return temperatures2;
}

function setSkyStatusAllDays(skyData) {
    cityProperties.children[0].children[1].innerHTML = skyData[0];

    for(let i = 0; i < dayNamesOfWeek1.children.length; i++) {
        dayNamesOfWeek1.children[i].children[1].innerHTML = skyData[i + 1];
    }
}

function setSkyStatusAllDays2(skyData2) {
    cityProperties.children[1].children[1].innerHTML = skyData2[0];

    for(let i = 0; i < dayNamesOfWeek2.children.length; i++) {
        dayNamesOfWeek2.children[i].children[1].innerHTML = skyData2[i + 1];
    }
}

let myChart = null;



// Events
cityName1Input.addEventListener('keyup', (event) => {
    showCity1Name.textContent = "City name";

    cityProperties.children[0].children[1].innerHTML = "-";
    cityProperties.children[0].children[2].innerHTML = "-";
    
    for(let j = 1; j < 3; j++) {
        for(let i = 0; i < dayNamesOfWeek1.children.length; i++) {
            dayNamesOfWeek1.children[i].children[j].innerHTML = "-";
        }
    }

    cityImage1.src = "";
    cityImage2.src = "";

    if(myChart != null)
        myChart.destroy();

    if(event.key == "Enter") {
        cityName1Input.value = capitalizeFirstLetter(cityName1Input.value);
        cityName2Input.value = capitalizeFirstLetter(cityName2Input.value);
        getCity5Days(cityName1Input.value, cityName2Input.value);
        getCityImage(cityName1Input.value, cityName2Input.value);
    }
});

cityName2Input.addEventListener('keyup', (event) => {
    showCity2Name.textContent = "City name";

    cityProperties.children[1].children[1].innerHTML = "-";
    cityProperties.children[1].children[2].innerHTML = "-";
    
    for(let j = 1; j < 3; j++) {
        for(let i = 0; i < dayNamesOfWeek2.children.length; i++) {
            dayNamesOfWeek2.children[i].children[j].innerHTML = "-";
        }
    }

    cityImage1.src = "";
    cityImage2.src = "";

    if(myChart != null)
        myChart.destroy();

    if(event.key == "Enter") {
        cityName1Input.value = capitalizeFirstLetter(cityName1Input.value);
        cityName2Input.value = capitalizeFirstLetter(cityName2Input.value);
        getCity5Days(cityName1Input.value, cityName2Input.value);
        getCityImage(cityName1Input.value, cityName2Input.value);
    }
});

submitBtn.addEventListener('click', () => {
    cityName1Input.value = capitalizeFirstLetter(cityName1Input.value);
    cityName2Input.value = capitalizeFirstLetter(cityName2Input.value);
    getCity5Days(cityName1Input.value, cityName2Input.value);
    getCityImage(cityName1Input.value, cityName2Input.value);
});



function drawGraph(labels, data1, data2, city1Label, city2Label) {
    const ctx = document.getElementById("myChart").getContext("2d");

    if(myChart != null) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: city1Label,
            data: data1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
          {
            label: city2Label,
            data: data2,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
}



const list1 = document.getElementById('visitedCities1').children[1];
const list2 = document.getElementById('visitedCities2').children[1];

function createVisitedCitiesListItem(visitedCities) {    
    // Remove all list items
    let child = list1.lastElementChild;  
    while(child) { 
        list1.removeChild(child); 
        child = list1.lastElementChild; 
    }

    // Update list with unique cities
    visitedCities.forEach(city => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(city));
        list1.appendChild(listItem);
    });
}

function createVisitedCitiesListItem2(visitedCities2) {    
    // Remove all list items
    let child = list2.lastElementChild;  
    while(child) { 
        list2.removeChild(child); 
        child = list2.lastElementChild; 
    }

    // Update list with unique cities
    visitedCities2.forEach(city => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(city));
        list2.appendChild(listItem);
    });
}

async function getCityImage(cityName1, cityName2) {
    const url1 = "https://api.unsplash.com/search/photos?query=" + cityName1 + "&client_id=" + UNSPLASH_API_KEY;
    const getImage1 = await fetch(url1).then(response => response.json());
    const url2 = "https://api.unsplash.com/search/photos?query=" + cityName2 + "&client_id=" + UNSPLASH_API_KEY;
    const getImage2 = await fetch(url2).then(response => response.json());

    console.log(getImage1.results);
    
    cityImage1.src = getImage1.results[0].urls.regular;
    cityImage2.src = getImage2.results[0].urls.regular;
}