//api key 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely,current,alerts&appid=50f3b7bbc39633c0695f5b6b710ca954

//need to get the lat and lon of the city the user types in.(How?)
//Need to figure out which data to exclude 
//Need to make a form for the user - input for city, search button
//need a search history where the cities are clickable and show current weather data
//need to generate html elements for the weather for today
//need to generate html elements for the weather for the next five days.

var formEl = document.querySelector(".weather-form")
//records search history
var searchHistory = [];

//used to hold the weather data for one day
class day {

}

//used to hold weather data for the current day and five future days
class weather{
    today;
    futureDays = [];
}


var getWeatherData = function(){
    //the fetch request goes here! puts data into weather object.
}

var displyWeatherData = function(){
    //takes the data from the weather object and makes html elements to display it 
}

var getCityLatLon = function(){
    //get the city latitude nad longitude from the city name
    lat = Geolocation.
    return {lat, lon};
}

var addCityToSearchHistory = function(){
    //adds city name to list of searches.
}

formEl.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("search button clicked");
});

//need to add an event listener for if a city in the search history is clicked.

