var linkURL = "http://api.openweathermap.org/data/2.5/weather?q={city name}&appid=b2624c3ce937d0aba4611a51057002d0";

var cityInputEl = document.getElementById("fCity");
var cityFormEl = document.getElementById("city-form");

var weatherEl = document.getElementById("weatherInfo");

var cityEl = document.getElementById("city");
var iconEl = document.getElementById("icon");
var temp = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv");

var day1El = document.getElementById("day-1");
var day2El = document.getElementById("day-2");
var day3El = document.getElementById("day-3");
var day4El = document.getElementById("day-4");
var day5El = document.getElementById("day-5");

var currentDay = moment().format("MMMM Do YYYY");

function init(){
    day1El.innerHTML = "";
    day2El.innerHTML = "";
    day3El.innerHTML = "";
    day4El.innerHTML = "";
    day5El.innerHTML = "";
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if(city) {
        getCityInfo(city);

        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name!");
    }
    init();
}

var getCityInfo = function (city) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b2624c3ce937d0aba4611a51057002d0";
    
    fetch(apiURL)
    .then(function(response){
        if(response.ok) {
            response.json()
            .then(function(data){
                console.log(city);
                console.log(data);
                displayCityInfo(data, city);
            });
        }
        else {
            alert("ERROR " + response.statusText)
        }
    })
    .catch(function (error) {
        alert("Unable to connect to Open Weather Map");
      });
};

var displayCityInfo = function(data, city) {
    var api5DayCast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=b2624c3ce937d0aba4611a51057002d0"
    fetch(api5DayCast)
    .then(function(response){
        response.json()
        .then(function(data){
            weatherEl.style.visibility = "visible";
            console.log(data);
            var weatherIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            iconEl.src = weatherIcon;
            var alt = data.current.weather[0].description;
            iconEl.setAttribute("alt", alt)
            cityEl.innerText = city + " " + currentDay + " ";
            temp.innerText = data.current.temp + "\u00B0F";
            windEl.innerText = data.current.wind_speed + " mph, " + " Degrees: " + data.current.wind_deg +"\u00B0";
            humidEl.innerText = data.current.humidity + "%";
            uvEl.innerText = data.current.uvi;
            for(i=0;i<5.;i++){
                if(i===0){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            h3.innerText = moment().add(1,"d").format("MMMM Do YYYY");
                            day1El.appendChild(h3);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day1El.appendChild(img);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day1El.appendChild(p);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day1El.appendChild(p);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day1El.appendChild(p);
                        }
                    }
                }
                if(i===1){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            h3.innerText = moment().add(2,"d").format("MMMM Do YYYY");
                            day2El.appendChild(h3);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day2El.appendChild(img);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day2El.appendChild(p);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day2El.appendChild(p);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day2El.appendChild(p);
                        }
                    }
                }
                if(i===2){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            h3.innerText = moment().add(3,"d").format("MMMM Do YYYY");
                            day3El.appendChild(h3);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day3El.appendChild(img);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day3El.appendChild(p);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day3El.appendChild(p);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day3El.appendChild(p);
                        }
                    }
                }
                if(i===3){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            h3.innerText = moment().add(4,"d").format("MMMM Do YYYY");
                            day4El.appendChild(h3);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day4El.appendChild(img);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day4El.appendChild(p);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day4El.appendChild(p);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day4El.appendChild(p);
                        }
                    }
                }
                if(i===4){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            h3.innerText = moment().add(5,"d").format("MMMM Do YYYY");
                            day5El.appendChild(h3);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day5El.appendChild(img);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day5El.appendChild(p);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day5El.appendChild(p);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day5El.appendChild(p);
                        }
                    }
                }
            }
        })
    })
}

cityFormEl.addEventListener("submit", formSubmitHandler);
