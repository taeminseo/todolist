const weather = document.querySelector(".js_weather");

const API_KEY = "api_key"
const COORDS = 'coords';

function getWeather(lat, log){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const temperature_min = json.main.temp_min;
        const temperature_max = json.main.temp_max;
        const place = json.name;
        weather.innerText = `PRE: ${temperature}℃
        LOW : ${temperature_min}℃ HIGH : ${temperature_max}℃
        @ ${place}`
    });
};


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

function handleGeoError(){
    console.log("Cant access geo location");
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
};

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
};
console.dir('Coords')

function init(){
    loadCoords();
};

init();
