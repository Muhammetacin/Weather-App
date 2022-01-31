// Global because it'll keep the city names as long as the app is running
let visitedCities = [];

const createVisitedCitiesListItem = (visitedCities) => {
    const list = document.getElementById('visitedCities').children[1];
    
    // Remove all list items
    let child = list.lastElementChild;

    while(child) { 
        list.removeChild(child); 
        child = list.lastElementChild; 
    }

    // Update list with unique cities
    visitedCities.forEach(city => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(city));
        list.appendChild(listItem);
    });
};

export const showVisitedCities = (responseCityName) => {
    visitedCities.push(responseCityName);
    visitedCities = visitedCities.filter((value, index, city) => city.indexOf(value) === index);

    createVisitedCitiesListItem(visitedCities);
};