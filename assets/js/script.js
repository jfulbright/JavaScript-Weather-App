// HTML Selectors
var weatherFormEl = document.querySelector('#weather-form');
var cityInputEl = document.querySelector('#city-search-term');
var weatherContainerEl = document.querySelector('#weatherContainer');
var citySearchEL = document.querySelector("#citySearch-list");
var currentDateDisplay = document.querySelector("#currentDateEl");
var currentDateEl = document.querySelector('#currentDate');
var weatherData = document.querySelectorAll('.weather-data');
var weatherCard = document.querySelector('#weatherCard');



// Global vars
const APIKey = "f40b7deac9fefe622d933a55fdf6ef80";
const geoCodeURL  = "http://api.openweathermap.org/geo/1.0/direct?"
const openWeatherURL = "https://api.openweathermap.org/data/3.0/onecall?"
const weatherIconURL = "https://openweathermap.org/img/wn/";
const currentDate = moment().format("dddd, MMMM Do");
var cities = []; //   Array of city search history
const forecastDays = 5;




// called on initial page load to store city search history from localStorage in var
function init() {
    // currentDateDisplay.innerHTML = currentDate; // display current date
  }

// Return weather object from One Call API endpoint
function getCurrentWeather(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim(); // store city value from form input
    fetch(`${geoCodeURL}q=${city}&appid=${APIKey}`)
      .then(response => response.json())
      .then(response => {
        
        console.log(response);
        const lat = response[0].lat;
        const lon = response[0].lon;
    
        return fetch(`${openWeatherURL}lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                
                
                
                
                
                for (var i = 0; i < forecastDays; i++) {
                    
                    // build weather cards for each day
                    var div = document.createElement("div");
                    var ul = document.createElement("ul");
                    
                    weatherContainerEl.appendChild(div);
                    div.setAttribute("class", "weatherCard");
                    div.setAttribute("id", `weatherDay${[i]}`);
                    div.appendChild(ul); 
                    ul.setAttribute("class", "weatherData")
                   
                    
                    // populating weather card from an  weather object data
                    const fragment = document.createDocumentFragment();
                    //TODO: response.daily[i].dt
                    const weatherNodes  = [
                        {
                            label: '',
                            value: moment().format("MM/DD/YYYY"),
                        }, 
                        {
                            label: 'Icon',
                            value: response.daily[i].weather[0].icon,
                        },
                        {
                            label: 'Temp',
                            value: `${response.daily[i].temp.day} °F`,
                        },
                        {
                            label: 'Wind',
                            value: `${response.daily[i].wind_speed} MPH`,
                        },
                        {
                            label: 'Humidity',
                            value: `${response.daily[i].humidity} %`,
                        }
                    ];
                    weatherNodes.forEach((weatherNodes) => {
                        
                        const li = document.createElement('li');
                        li.textContent = `${weatherNodes.label}: ${weatherNodes.value}`;
                        li.setAttribute("data-index", i);
                        fragment.appendChild(li);
                    });
                    
                    ul.appendChild(fragment);


                  
                }
                    

            });

    })
    .catch(err => console.error(err));
}


    // Event Listeners
weatherFormEl.addEventListener('submit', getCurrentWeather);
init();