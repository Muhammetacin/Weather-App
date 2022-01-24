const cityName = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');

const APIkey = "c863e7658bfbe95e2049298afb62ccf5";
const apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName.value + "&appid=" + APIkey;

async function getCity(cityName) {
    const apiString = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    try {
      const response = await fetch(apiString).then(response => response.json());
      console.log(response);
    } catch (error) {
      console.error(error);
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