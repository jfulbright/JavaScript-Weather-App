// HTML Selectors
var weatherFormEl = document.querySelector("#weather-form");
var cityInputEl = document.querySelector("#city-search-term");
var cityNameEl = document.querySelector("#cityNameEl");
var weatherContainerEl = document.querySelector("#weatherContainer");
var citySearchHistoryEl = document.querySelector("#citySearchHistory");
var currentDateDisplay = document.querySelector("#currentDateEl");
var currentDateEl = document.querySelector(".currentDate");
var weatherData = document.querySelectorAll(".weather-data");
var weatherCard = document.querySelector("#weatherCard");

// Global Vars
const APIKey = "f40b7deac9fefe622d933a55fdf6ef80";
const geoCodeURL = "http://api.openweathermap.org/geo/1.0/direct?";
const openWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?";
const weatherIcon = "https://openweathermap.org/img/wn/";
const currentDate = moment().format("MM/DD/YY");
var cities = [];
const currentWeather = [];
const forecastDays = 5;

// Functions
function init() {
  getCityLocalStorage();
}

// get city history for local storage
getCityLocalStorage = () => {
  // populate array from localStorage
  cityArr = JSON.parse(localStorage.getItem("weatherCityHistory"));
  // if localStorage exists, dedup searches.
  if (cityArr) {
    cities = [...new Set(cityArr)];
  }
  // Render city search history with event listeners
  cities.forEach((item) => {
    newlistItem = document.createElement("button");
    newlistItem.setAttribute("data-city", item);
    newlistItem.setAttribute("class", "list-group-item");
    newlistItem.innerHTML = item;
    citySearchHistoryEl.appendChild(newlistItem);

    newlistItem.addEventListener("click", function () {
      const city = this.getAttribute("data-city");
      getCurrentWeather(city);
    });
  });
};

var getCurrentWeather = (city) => {
  // get lat and lon from city query
  fetch(`${geoCodeURL}q=${city}&appid=${APIKey}`)
    .then((responseCity) => responseCity.json())

    // append recent city search to localStorage
    .then(async (responseCity) => {
      cities.push(responseCity[0].name);
      localStorage.setItem("weatherCityHistory", JSON.stringify(cities));

      // return current weather & store in array
      const responseWeather = await fetch(
        `${openWeatherURL}lat=${responseCity[0].lat}&lon=${responseCity[0].lon}&appid=${APIKey}&units=imperial`
      );

      // convert response to JSON and populate currenWeather Array
      const responseWeatherJSON = await responseWeather.json();
      currentWeather.push(responseWeatherJSON);

      //   const currentWeather2 = responseWeatherJSON.filter(current =>
      //     current[0].
      //     );

      // display city name and date
      cityNameEl.innerHTML = responseCity[0].name;
      currentDateDisplay.innerHTML = `(${currentDate})`;

      // display current weather
      console.log(currentWeather);
    })

    .catch((err) => console.error(err));
};

var returnCurrentWeather = (city) => {};

// Return weather object from One Call API endpoint
function getCurrentWeatherOld(event) {
  event.preventDefault();
  console.log(event);
  // store city value from form input
  var city = cityInputEl.value.trim();

  // get lat and long by city name
  fetch(`${geoCodeURL}q=${city}&appid=${APIKey}`)
    .then((response) => response.json())
    .then(async (response) => {
      const city = response[0].name;
      const lat = response[0].lat;
      const lon = response[0].lon;

      // append recent city search to localStorage
      cities.push(city);
      localStorage.setItem("weatherCityHistory", JSON.stringify(cities));

      // return weather from lat and long
      const response_1 = await fetch(
        `${openWeatherURL}lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
      );
      const response_2 = await response_1.json();
      cityNameEl.innerHTML = city;
      currentWeather.push(response_2);
      console.log(currentWeather);
      for (var i = 0; i < forecastDays; i++) {
        // build weather cards for each day
        var div = document.createElement("div");
        var ul = document.createElement("ul");

        weatherContainerEl.appendChild(div);
        div.setAttribute("class", "weatherCard");
        div.setAttribute("id", `weatherDay${[i]}`);
        div.appendChild(ul);
        ul.setAttribute("class", "weatherData");

        // populating weather card from an  weather object data
        const fragment = document.createDocumentFragment();

        const weatherNodes = [
          {
            label: "",
            value: moment.unix(response_2.daily[i].dt).format("MM/DD/YYYY"),
          },
          {
            label: "Icon:",
            value: `${weatherIcon}${response_2.daily[i].weather[0].icon}.png`,
          },
          {
            label: "Temp:",
            value: `${response_2.daily[i].temp.day} °F`,
          },
          {
            label: "Wind:",
            value: `${response_2.daily[i].wind_speed} MPH`,
          },
          {
            label: "Humidity:",
            value: `${response_2.daily[i].humidity} %`,
          },
        ];

        // helper callback function
        function fragmentFromString(strHTML) {
          var temp = document.createElement("template");
          temp.innerHTML = strHTML;
          return temp.content;
        }

        weatherNodes.forEach((weatherNodes_1) => {
          let strHTML_1 = `<li data-index="">${weatherNodes_1.label[i]}: ${weatherNodes_1.value[i]}:</li>`;

          fragmentFromString(strHTML_1);
        });
      }
    })
    .catch((err) => console.error(err));
}

// Event Listeners

/// city search form submit
weatherFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  var city = cityInputEl.value.trim();
  getCurrentWeather(city);
});

// /// city history click
// cityHistoryEl.forEach(function (item) {
//   item.addEventListener("click", function () {
//     const city = this.getAttribute("data-city");
//     getCurrentWeather(city);
//   });
// });

init();
