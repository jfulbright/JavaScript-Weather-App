// HTML Selectors
var weatherFormEl = document.querySelector('#weather-form');
var cityInputEl = document.querySelector('#city-search-term');
var weatherContainerEl = document.querySelector('#current-weather-container');

// OpenWeather API Variables
var APIKey = "34d831003b90009ac92768b6ed04fb6a";
var weatherIconURL = "https://openweathermap.org/img/wn/";

// Current date/time Variables:
var currentDateEl = document.querySelector('#currentDate');
var currentDate = moment().format("dddd, MMMM Do");

// Render current date in header
var currentDateDisplay = document.querySelector(".currentDateEl");
currentDateDisplay.innerHTML = currentDate;

// City Search History selectors and vars
var citySearchEL = document.querySelector("#citySearch-list");
var cities = []; //   Array of cities search history
var foo = [];


// Function to handle Weather Search Form 
function weatherFormHandler (event) {
  event.preventDefault();

  var citySearch = cityInputEl.value.trim();
  // cities.push(citySearch);
  foo.push(citySearch);
    

  if (citySearch) {
    
    getWeatherData(citySearch); // calls getWeatherData function
    storeCities(citySearch);  // calls function to store localStorage
    weatherContainerEl.textContent = ''; // this will clear current weather
    cityInputEl.value = '';
   
        
  } else {
    alert('Please enter a City');
  }
};


// Search History function to return Weather API
var buttonClickHandler = function (event) {
  var citySearch = event.target.getAttribute('data-city');

  if (citySearch) {
    getWeatherData(citySearch);
    storeCities(citySearch);  // passes city name to store city in localStorage
    weatherContainerEl.textContent = `Display Current Weather Here ${queryURL}`; // this will clear current weather
  }
};




// function to render current weather
 function displayWeather (weatherResponse) {
  console.log(weatherResponse);
  var cityName = weatherResponse.city.name;
  var currentDate;
  var currentTemp = weatherResponse.list[0].main.temp;
  var currentHumidity = weatherResponse.list[0].main.humidity;
  var currentIcon = weatherResponse.list[0].weather[0].icon;
  var currentIconURL = `${weatherIconURL}${currentIcon}.png`;
  var currentWindSpeed = weatherResponse.list[0].wind.speed;

  console.log(weatherResponse.base); //trying to traverse the object
  if (weatherResponse.length === 0) {
    weatherContainerEl.textContent = 'No weather found.';
    return;
  }

  weatherContainerEl.textContent = 
  `City: ${cityName} 
  - Temp: ${currentTemp} 
  - Icon ${currentIcon}
  - Humidity: ${currentHumidity} 
  - currentIconURL: ${currentIconURL} 
  - currentWindSpeed:  ${currentWindSpeed}`;
  
 
  // TODO: function to loop through weather Object Response and set 5 day forcase variables
 
  for (var i = 0; i < 4; i++) {
    this["currentTemp"+i] = weatherResponse.list[i].main.temp;
    this["currentHumidity"+i] = weatherResponse.list[i].main.humidity;
    this["currentIcon"+i] = weatherResponse.list[i].weather[0].icon;
    this["currentWindSpeed"+i] = weatherResponse.list[i].wind.speed;
    console.log(currentTemp+i);
    console.log(currentHumidity+i);
  }
  
};









// TODO: Redner Cities from LocalStorage
function renderCities() {
  citySearchEL.innerHTML = "";
  
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);
    li.setAttribute("data-city", city);

    var button = document.createElement("button");
    button.textContent = "Get Weather";

    li.appendChild(button);
    citySearchEL.appendChild(li);
  }
}

// Store cities in localStorage
function storeCities(city) {
  localStorage.setItem("city", JSON.stringify(city));
}

// called on page load to store city search history from localStorage in var
function init() {
  var storedCities = JSON.parse(localStorage.getItem("city"));
  if (storedCities !== null) {
    cities = storedCities;
  }
  console.log(cities);
  renderCities();
}



// Event Listeners
weatherFormEl.addEventListener('submit', weatherFormHandler);



init();