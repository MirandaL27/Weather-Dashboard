//api key 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely,current,alerts&appid=50f3b7bbc39633c0695f5b6b710ca954
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=50f3b7bbc39633c0695f5b6b710ca954
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


var getWeatherData = function(lat, lon){
    //the fetch request goes here! puts data into weather object.
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat +"&lon=" +lon+ "&exclude=hourly,minutely,current,alerts&appid=50f3b7bbc39633c0695f5b6b710ca954";
    fetch(weatherUrl)
    .then(function(response){
    if(response.ok){
        response.json().then(function (data){
        console.log(data);
        displyWeatherData();
    });
    }else{
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
        alert('Unable to connect to Open Weather API');
      });
}

var displyWeatherData = function(){
    //takes the data from the weather object and makes html elements to display it 
}

var getCityLatLon = function(cityName){
    //get the city latitude nad longitude from the city name
    //need a fetch request for the data from the weather api
    var weatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=50f3b7bbc39633c0695f5b6b710ca954"
    var lat = 0;
    var lon = 0;
    fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            getWeatherData(lat,lon);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather API');
    });
    
}

var displayCitySearchHistory = function() {
    //make html elements to display the list of cities in the search history
}

var addCityToSearchHistory = function(){
    //adds city name to list of searches.

}

formEl.addEventListener("submit", function(event){
    event.preventDefault();
    var inputEl = document.querySelector("#city");
    //getWeatherData(inputEl.value);
    getCityLatLon(inputEl.value);
});

//need to add an event listener for if a city in the search history is clicked.

