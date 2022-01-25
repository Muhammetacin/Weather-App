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
