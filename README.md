# Documentation of the code

## Html file structure

There are 4 blocks in the body of the page. Input, submit, weather info and footer.

### Input

The input block, input area, has an h1 heading for when a city is submitted the name will be presented.
It has an input field where user can write down the city name.

### Submit

A div block with only the button in it. User can search for a city by clicking the Submit button or by pressing enter.
If the city exists, its temperature information will be shown correctly in all the right places. Weather information for the whole week is shown in the wheather info block. If input field is empty or city name is written incorrectly, an error message will be shown in h1 heading and in console.

### Weather info

This is the div block where all the fetched weather information is shown. The day names for the whole week is generated automatically with function: getDayAndSetAllDaysOfWeek. With this, today's day is calculated and the next daynames of the week are written correctly. Today's temperature is shown big on top of the days of the week. Every day's temperature is shown (7 days in total) and the sky status is shown with a few words. That is also included in the fetched data from API.

### Footer

There is not much to tell about footer. It sticks to the bottom of the page and has some text in it.

## Css styling

For the styling and layout of the page this was the inspiration <https://www.behance.net/gallery/89021305/Weather?tracking_source=search_projects_recommended%7Cweather%20app%20ui>

Because of the limited time and me being not creative enough I decided to go with a simpler design in order to focus more on the technical and functional stuff.

## JavaScript functionality

### getCity5Days(cityName)

The function has the keyword async before it meaning it's executed asynchronous. In this function, an API string is generated with the API key and information about the weather of the submitted city is fetched. The response holds all the information in JSON format. Using all the information in there the temp and skyStatus data are put in arrays.

Today's date is created to set the next day's names. Everything is set inside this function (temps, skyStatus', day names). This async function is called when user hits enter button on keyboard or clicks on submit button.

### capitalizeFirstLetter(string)

This function slices the first letter from input string and capitalizes it and puts it back. So it capitalizes the first letter. Purely for the look and feel of the app.

### getDayAndSetAllDaysOfWeek(today)

Today is an integer. 0 = sunday, 1 = monday, ... Using that number an array of whole week days' names are created. After that the correct names are put in their place.

### setTempAllDays(tempData)

Using the created weather information array, all temperatures of the next 5 days are put in their places in Html elements.

### setSkyStatusAllDays(skyData)

Using the created weather information array, all sky data of the next 5 days are put in their places in Html elements.

## Events

### KeyUp

Every button on keyboard triggers this event. When user starts typing the temperatures and sky data information will be deleted and just a '-' is shown to reset the previous city's information. When user types something and hits enter key and if the city exists all the correct data will be shown. Otherwise, the heading on top will give an error message to let the user know that the city does not exist.

### Click

When the user clicks submit button and the city exists, all the correct data will be shown. Otherwise, the heading on top will give an error message to let the user know that the city does not exist.
