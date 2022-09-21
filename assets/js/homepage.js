var weatherFormEl = document.querySelector('#weather-form');
var citySearchButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#city-search-term');
var weatherContainerEl = document.querySelector('#current-weather-container');


var formSubmitHandler = function (event) {
  event.preventDefault();

  var citySearch = cityInputEl.value.trim();

  if (citySearch) {
    getWeatherData(citySearch);

    weatherContainerEl.textContent = 'Display Current Weather Here'; // this will clear current weather
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var buttonClickHandler = function (event) {
  var citySearch = event.target.getAttribute('data-city');

  if (citySearch) {
    getWeatherData(citySearch);

    weatherContainerEl.textContent = 'Display Current Weather Here'; // this will clear current weather
  }
};

function getWeatherData () {
console.log('getWeatherData funciton called');
};

weatherFormEl.addEventListener('submit', formSubmitHandler);
citySearchButtonsEl.addEventListener('click', buttonClickHandler);
