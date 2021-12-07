var searchHistoryContainerEl = document.querySelector(".search-history-container");
var weatherContainerEl = document.querySelector(".weather-container");
var formEl = document.querySelector(".weather-form")
var searchHistoryButtonContainerEl = document.querySelector(".search-history-button-container");
//records search history
var searchHistory = [];

//used to hold the weather data for one day
class day {
    cityName;
    temp;
    wind;
    humidity;
    uvi;
    uviSeverity;
    icon;
    date;
}

//used to hold weather data for the current day and five future days
var days = [];

var loadSearchHistory = function(){
    var storage = localStorage.getItem("searches");
    if(storage){
        searchHistory = JSON.parse(storage);
    }
    displayCitySearchHistory();
}

var saveSearchHistory = function(){
    localStorage.setItem("searches",JSON.stringify(searchHistory));
}

var clearSearchHistory = function(){
    localStorage.removeItem("searches");
    searchHistory.length = 0;
    displayCitySearchHistory();
}

var getWeatherData = function(lat, lon, city){
    //the fetch request goes here! puts data into weather object.
    //clear days array first
    days.length = 0;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat +"&lon=" +lon+ "&units=imperial"+"&exclude=hourly,minutely,current,alerts&appid=50f3b7bbc39633c0695f5b6b710ca954";
    fetch(weatherUrl)
    .then(function(response){
    if(response.ok){
        response.json().then(function (data){
        for(var i = 0; i < 6 ; i++){
            var testDay = new day();
            testDay.cityName = city;
            testDay.temp = data.daily[i].temp.day;
            testDay.wind = data.daily[i].wind_speed;
            testDay.humidity = data.daily[i].humidity;
            testDay.uvi = data.daily[i].uvi;
            testDay.icon = data.daily[i].weather[0].icon;
            var date = new Date(data.daily[i].dt*1000);
            testDay.date = date.toLocaleDateString("en-US");
            if(testDay.uvi <= 2 && testDay.uvi >= 0){
                testDay.uviSeverity = "Low";
            }
            else if(testDay.uvi >=3 && testDay.uvi <=7){
                testDay.uviSeverity = "Moderate";
            }
            else{
                testDay.uviSeverity = "Severe";
            }
            days.push(testDay);
        }   
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

var getUIVBackgroundColor = function(severity){
    //this function returns a background color based on the UVI severity
    if(severity === "Low"){
        return "green";
    }
    else if(severity === "Moderate"){
        return "yellow";
    }
    else{
        return "red";
    }
}
var displayToday = function(){
    //this function makes the html elements for today.
    //remove today first 
    var divEl = document.querySelector(".today");
    divEl.remove();

    divEl=document.createElement("div");
    divEl.className ="today";

    divEl.style.display = "block";
    //make the html elements inside the div
    var h2El = document.createElement("h2");
    h2El.textContent = days[0].cityName + " (" + days[0].date + ")";
    divEl.appendChild(h2El);

    varIconUrl = "http://openweathermap.org/img/wn/" + days[0].icon + "@2x.png";
    var imgEl = document.createElement("img");
    imgEl.src = varIconUrl;
    divEl.appendChild(imgEl);

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: "+days[0].temp + "\xB0F";
    divEl.appendChild(tempEl)

    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + days[0].temp + " MPH";
    divEl.appendChild(windEl);

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + days[0].humidity + " %";
    divEl.appendChild(humidityEl);

    var uviEl = document.createElement("p");
    uviEl.textContent = "UV Index: ";
    var uviSpan = document.createElement("span");
    uviSpan.textContent = days[0].uvi;
    uviSpan.style.backgroundColor = getUIVBackgroundColor(days[0].uviSeverity);
    uviSpan.style.color = "white";
    uviSpan.style.padding = "5px";
    uviSpan.style.borderRadius = "10px";
    uviEl.appendChild(uviSpan);
    divEl.appendChild(uviEl);
    weatherContainerEl.appendChild(divEl);
}

var displyWeatherData = function(){
    //takes the data from the weather array and makes html elements to display it 
    //make first day
    displayToday();
    var divEl = document.querySelector(".other-five-days");
        divEl.remove();

    divEl=document.createElement("div");
    divEl.className ="other-five-days";
    for(var i = 1; i<6;i++){
        //makes the other five days
        
        var childDivEl = document.createElement("div");
        childDivEl.style.backgroundColor = "blue";
        childDivEl.style.color = "white";
        childDivEl.style.padding = "10px";
        childDivEl.style.width = "15%";
        childDivEl.style.border = "3px solid black";
        childDivEl.style.borderRadius = "10px";
        var h3El = document.createElement("h3");
        h3El.textContent = days[i].date;
        childDivEl.appendChild(h3El);

        varIconUrl = "http://openweathermap.org/img/wn/" + days[i].icon + "@2x.png";
        var imgEl = document.createElement("img");
        imgEl.src = varIconUrl;
        childDivEl.appendChild(imgEl);

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: "+days[i].temp + "\xB0F";
        childDivEl.appendChild(tempEl)

        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + days[i].temp + " MPH";
        childDivEl.appendChild(windEl);

        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humidity: " + days[i].humidity + " %";
        childDivEl.appendChild(humidityEl);

        divEl.appendChild(childDivEl);
        
    }
    weatherContainerEl.appendChild(divEl);
}

var noDataToDisplay = function(){
    //this function displays "No Data Found" if the request returns no data.
    var divEl = document.querySelector(".today");
    divEl.remove();

    divEl=document.createElement("div");
    divEl.className ="today";
    divEl.textContent = "No Data Found."

    divEl.style.display = "block";
    weatherContainerEl.appendChild(divEl);

    var divEl = document.querySelector(".other-five-days");
    divEl.remove();

    divEl=document.createElement("div");
    divEl.className ="other-five-days";

    weatherContainerEl.appendChild(divEl);
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
            if(data.length == 0){
                noDataToDisplay();
                return;
            }
            lat = data[0].lat;
            lon = data[0].lon;
            getWeatherData(lat,lon, cityName);
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
    var buttons = Array.from(document.getElementsByClassName("search-hist-btn"));
    console.log(buttons);
    if(buttons){
        
        //remove old search history
        for(var i= 0; i < buttons.length; i++){
            searchHistoryContainerEl.removeChild(buttons[i]);
            console.log(buttons[i],buttons.length);
        }  
        
    }

    //put new search history in
    for(var i = 0;i < searchHistory.length; i++){
        var buttonEl = document.createElement("button");
        buttonEl.textContent = searchHistory[i];
        buttonEl.className = "search-hist-btn";
        searchHistoryContainerEl.appendChild(buttonEl);
    }
}

var addCityToSearchHistory = function(city){
    //adds city name to list of searches.
    searchHistory.push(city);
    console.log(searchHistory);
    saveSearchHistory();
    displayCitySearchHistory();
}

formEl.addEventListener("submit", function(event){
    event.preventDefault();
    var inputEl = document.querySelector("#city");
    getCityLatLon(inputEl.value);
    addCityToSearchHistory(inputEl.value);
});

searchHistoryContainerEl.addEventListener("click",function(event){
    getCityLatLon(event.target.textContent.trim());
    addCityToSearchHistory(event.target.textContent.trim());
})

searchHistoryButtonContainerEl.addEventListener("click", function(event){
    clearSearchHistory();
});


loadSearchHistory();

