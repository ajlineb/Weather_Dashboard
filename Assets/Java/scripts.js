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
var uvColorEl = document.getElementById("uvColor");

var day1El = document.getElementById("day-1");
var day2El = document.getElementById("day-2");
var day3El = document.getElementById("day-3");
var day4El = document.getElementById("day-4");
var day5El = document.getElementById("day-5");

var historyEl = document.getElementById("history");
var historyBtn = document.getElementsByClassName("historyBtn");

var currentDay = moment().format("MMMM Do YYYY");

//clears all data for the next city
function clear(){
    day1El.innerHTML = "";
    day2El.innerHTML = "";
    day3El.innerHTML = "";
    day4El.innerHTML = "";
    day5El.innerHTML = "";
    weatherEl.style.visibility = "hidden";
}

//gets the value entered into the search bar
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
    clear();
}

//calls the openweather api with the value inputed from the form submit and gets its info
var getCityInfo = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b2624c3ce937d0aba4611a51057002d0";
    
    fetch(apiURL)
    .then(function(response){
        if(response.ok) {
            response.json()
            .then(function(data){
                //console.log(city);
                //console.log(data);
                displayCityInfo(data, city);
            });
        }
        //if the city does not exist responds with an error
        else {
            alert("ERROR " + response.statusText)
        }
    })
    //if the call is unable to connect to openweather api
    .catch(function (error) {
        alert("Unable to connect to Open Weather Map");
      });
};

//calls the api using coordinates this time to get more specific data and displays all of its information
var displayCityInfo = function(data, city) {
    var api5DayCast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=b2624c3ce937d0aba4611a51057002d0"
    fetch(api5DayCast)
    .then(function(response){
        response.json()
        .then(function(data){
            ////////////////// builds the information for the current day
            weatherEl.style.visibility = "visible";
            //console.log(data);
            var weatherIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            iconEl.src = weatherIcon;
            var alt = data.current.weather[0].description;
            iconEl.setAttribute("alt", alt)
            cityEl.innerText = city + " " + currentDay + " ";
            temp.innerText = data.current.temp + "\u00B0F";
            windEl.innerText = data.current.wind_speed + " mph, " + " Degrees: " + data.current.wind_deg +"\u00B0";
            humidEl.innerText = data.current.humidity + "%";
            uvEl.innerText = data.current.uvi;
            uvnumber = parseInt(data.current.uvi);
            ///////////////// checks the uvIndex and assigns a color based on intensity
            if(uvnumber<2){
                uvColorEl.style.backgroundColor = "green";
                uvColorEl.style.color = "white";
            };
            if(uvnumber>2 && uvnumber <= 5) {
                uvColorEl.style.backgroundColor = "yellow";
                uvColorEl.style.color = "black";
            };
            if(uvnumber>5 && uvnumber <= 7){
                uvColorEl.style.backgroundColor = "orange";
                uvColorEl.style.color = "white";
            };
            if(uvnumber>7 && uvnumber <= 10) {
                uvColorEl.style.backgroundColor = "red";
                uvColorEl.style.color = "white";
            };
            if(uvnumber>10) {
                uvColorEl.style.backgroundColor = "purple";
                uvColorEl.style.color = "white";
            };
            /////////////// builds the 5-DayForecast using a for-loop
            for(i=0;i<5.;i++){
                if(i===0){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            var br = document.createElement("br");
                            h3.innerText = moment().add(1,"d").format("MMMM Do YYYY");
                            day1El.appendChild(h3);
                            day1El.appendChild(br);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var br = document.createElement("br");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day1El.appendChild(img);
                            day1El.appendChild(br);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day1El.appendChild(p);
                            day1El.appendChild(br);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day1El.appendChild(p);
                            day1El.appendChild(br);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day1El.appendChild(p);
                            day1El.appendChild(br);
                        }
                    }
                }
                if(i===1){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            var br = document.createElement("br");
                            h3.innerText = moment().add(2,"d").format("MMMM Do YYYY");
                            day2El.appendChild(h3);
                            day2El.appendChild(br);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var br = document.createElement("br");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day2El.appendChild(img);
                            day2El.appendChild(br);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day2El.appendChild(p);
                            day2El.appendChild(br);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day2El.appendChild(p);
                            day2El.appendChild(br);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day2El.appendChild(p);
                            day2El.appendChild(br);
                        }
                    }
                }
                if(i===2){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            var br = document.createElement("br");
                            h3.innerText = moment().add(3,"d").format("MMMM Do YYYY");
                            day3El.appendChild(h3);
                            day3El.appendChild(br);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var br = document.createElement("br");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day3El.appendChild(img);
                            day3El.appendChild(br);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day3El.appendChild(p);
                            day3El.appendChild(br);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day3El.appendChild(p);
                            day3El.appendChild(br);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day3El.appendChild(p);
                            day3El.appendChild(br);
                        }
                    }
                }
                if(i===3){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            var br = document.createElement("br");
                            h3.innerText = moment().add(4,"d").format("MMMM Do YYYY");
                            day4El.appendChild(h3);
                            day4El.appendChild(br);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var br = document.createElement("br");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day4El.appendChild(img);
                            day4El.appendChild(br);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day4El.appendChild(p);
                            day4El.appendChild(br);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day4El.appendChild(p);
                            day4El.appendChild(br);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day4El.appendChild(p);
                            day4El.appendChild(br);
                        }
                    }
                }
                if(i===4){
                    for(j=0;j<5;j++){
                        if (j===0){
                            var h3 = document.createElement("h3");
                            var br = document.createElement("br");
                            h3.innerText = moment().add(5,"d").format("MMMM Do YYYY");
                            day5El.appendChild(h3);
                            day5El.appendChild(br);
                        }
                        if (j===1){
                            var img = document.createElement("img");
                            var br = document.createElement("br");
                            var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            var altIcon1 = data.daily[i].weather[0].description;
                            img.src =weatherIconF1;
                            img.setAttribute("alt", altIcon1);
                            day5El.appendChild(img);
                            day5El.appendChild(br);
                        }
                        if (j===2){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                            day5El.appendChild(p);
                            day5El.appendChild(br);
                        }
                        if (j===3){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                            day5El.appendChild(p);
                            day5El.appendChild(br);
                        }
                        if (j===4){
                            var p = document.createElement("p");
                            var br = document.createElement("br");
                            p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                            day5El.appendChild(p);
                            day5El.appendChild(br);
                        }
                    }
                }
            }
            /////////////// stores the data from that city and its name in the local storage
            storeData(data, city);
            /////////////// prints the city name in the history column
            writeHistory(city);
        })
    })
};

//function that stores the city info and name to local storage
var storeData = function(cityData, cityName) {
    var cityDataString = JSON.stringify(cityData);
    localStorage.setItem(cityName, cityDataString);
};

//writes the history into the history column
var writeHistory = function(cityName) {
    var name = cityName;
    var button = document.createElement("button");
    var li = document.createElement("li");
    // for(i=0;i<=localStorage.length;i++) {
    //     console.log(i);
    //     console.log(localStorage.length)
    //     if(name === localStorage.key(i)) {
    //         console.log(name)
    //         console.log(localStorage.key(i) + "key");
    //         return;
    //     }
    //     else if(localStorage.length === i-1) {
    //         li.innerText = name;
    //         button.appendChild(li);
    //         historyEl.appendChild(button);
    //     }
    // }
    li.innerText = name;
    li.classList.add("historyBtn");
    button.appendChild(li);
    historyEl.appendChild(button);
    putEventListeners();
};

//initializes the webpage by getting the local storage from previous sessions and displaying the citys
var init = function() {
    for(i=0;i<localStorage.length;i++) {
        var name = localStorage.key(i);
        var button = document.createElement("button");
        var li = document.createElement("li");
        li.innerText = name;
        li.classList.add("historyBtn");
        button.appendChild(li);
        historyEl.appendChild(button);
    }
    //console.log(historyBtn);
};

//function that calles the specific city that is clicked and activates the display history function
var historyClicked = function() {
    clear();
    for(i=0;i<localStorage.length;i++) {
        //console.log(this.innerText);
        if(this.innerText === localStorage.key(i)) {
            cityDataObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
            displayHistory(cityDataObject, localStorage.key(i));
            //console.log(cityDataObject);
        }
    }
}

//displays the city info and name by using the local storage information that was sent from historyclicked
var displayHistory = function(data, city) {
    ////////////////// builds the information for the current day
    weatherEl.style.visibility = "visible";
    //console.log(data);
    var weatherIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
    iconEl.src = weatherIcon;
    var alt = data.current.weather[0].description;
    iconEl.setAttribute("alt", alt)
    cityEl.innerText = city + " " + currentDay + " ";
    temp.innerText = data.current.temp + "\u00B0F";
    windEl.innerText = data.current.wind_speed + " mph, " + " Degrees: " + data.current.wind_deg +"\u00B0";
    humidEl.innerText = data.current.humidity + "%";
    uvEl.innerText = data.current.uvi;
    uvnumber = parseInt(data.current.uvi);
    ///////////////// checks the uvIndex and assigns a color based on intensity
    if(uvnumber<2){
        uvColorEl.style.backgroundColor = "green";
        uvColorEl.style.color = "white";
    };
    if(uvnumber>2 && uvnumber <= 5) {
        uvColorEl.style.backgroundColor = "yellow";
        uvColorEl.style.color = "black";
    };
    if(uvnumber>5 && uvnumber <= 7){
        uvColorEl.style.backgroundColor = "orange";
        uvColorEl.style.color = "white";
    };
    if(uvnumber>7 && uvnumber <= 10) {
        uvColorEl.style.backgroundColor = "red";
        uvColorEl.style.color = "white";
    };
    if(uvnumber>10) {
        uvColorEl.style.backgroundColor = "purple";
        uvColorEl.style.color = "white";
    };
    /////////////// builds the 5-DayForecast using a for-loop
    for(i=0;i<5.;i++){
        if(i===0){
            for(j=0;j<5;j++){
                if (j===0){
                    var h3 = document.createElement("h3");
                    var br = document.createElement("br");
                    h3.innerText = moment().add(1,"d").format("MMMM Do YYYY");
                    day1El.appendChild(h3);
                    day1El.appendChild(br);
                }
                if (j===1){
                    var img = document.createElement("img");
                    var br = document.createElement("br");
                    var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var altIcon1 = data.daily[i].weather[0].description;
                    img.src =weatherIconF1;
                    img.setAttribute("alt", altIcon1);
                    day1El.appendChild(img);
                    day1El.appendChild(br);
                }
                if (j===2){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                    day1El.appendChild(p);
                    day1El.appendChild(br);
                }
                if (j===3){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                    day1El.appendChild(p);
                    day1El.appendChild(br);
                }
                if (j===4){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                    day1El.appendChild(p);
                    day1El.appendChild(br);
                }
            }
        }
        if(i===1){
            for(j=0;j<5;j++){
                if (j===0){
                    var h3 = document.createElement("h3");
                    var br = document.createElement("br");
                    h3.innerText = moment().add(2,"d").format("MMMM Do YYYY");
                    day2El.appendChild(h3);
                    day2El.appendChild(br);
                }
                if (j===1){
                    var img = document.createElement("img");
                    var br = document.createElement("br");
                    var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var altIcon1 = data.daily[i].weather[0].description;
                    img.src =weatherIconF1;
                    img.setAttribute("alt", altIcon1);
                    day2El.appendChild(img);
                    day2El.appendChild(br);
                }
                if (j===2){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                    day2El.appendChild(p);
                    day2El.appendChild(br);
                }
                if (j===3){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                    day2El.appendChild(p);
                    day2El.appendChild(br);
                }
                if (j===4){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                    day2El.appendChild(p);
                    day2El.appendChild(br);
                }
            }
        }
        if(i===2){
            for(j=0;j<5;j++){
                if (j===0){
                    var h3 = document.createElement("h3");
                    var br = document.createElement("br");
                    h3.innerText = moment().add(3,"d").format("MMMM Do YYYY");
                    day3El.appendChild(h3);
                    day3El.appendChild(br);
                }
                if (j===1){
                    var img = document.createElement("img");
                    var br = document.createElement("br");
                    var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var altIcon1 = data.daily[i].weather[0].description;
                    img.src =weatherIconF1;
                    img.setAttribute("alt", altIcon1);
                    day3El.appendChild(img);
                    day3El.appendChild(br);
                }
                if (j===2){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                    day3El.appendChild(p);
                    day3El.appendChild(br);
                }
                if (j===3){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                    day3El.appendChild(p);
                    day3El.appendChild(br);
                }
                if (j===4){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                    day3El.appendChild(p);
                    day3El.appendChild(br);
                }
            }
        }
        if(i===3){
            for(j=0;j<5;j++){
                if (j===0){
                    var h3 = document.createElement("h3");
                    var br = document.createElement("br");
                    h3.innerText = moment().add(4,"d").format("MMMM Do YYYY");
                    day4El.appendChild(h3);
                    day4El.appendChild(br);
                }
                if (j===1){
                    var img = document.createElement("img");
                    var br = document.createElement("br");
                    var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var altIcon1 = data.daily[i].weather[0].description;
                    img.src =weatherIconF1;
                    img.setAttribute("alt", altIcon1);
                    day4El.appendChild(img);
                    day4El.appendChild(br);
                }
                if (j===2){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                    day4El.appendChild(p);
                    day4El.appendChild(br);
                }
                if (j===3){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                    day4El.appendChild(p);
                    day4El.appendChild(br);
                }
                if (j===4){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                    day4El.appendChild(p);
                    day4El.appendChild(br);
                }
            }
        }
        if(i===4){
            for(j=0;j<5;j++){
                if (j===0){
                    var h3 = document.createElement("h3");
                    var br = document.createElement("br");
                    h3.innerText = moment().add(5,"d").format("MMMM Do YYYY");
                    day5El.appendChild(h3);
                    day5El.appendChild(br);
                }
                if (j===1){
                    var img = document.createElement("img");
                    var br = document.createElement("br");
                    var weatherIconF1 = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var altIcon1 = data.daily[i].weather[0].description;
                    img.src =weatherIconF1;
                    img.setAttribute("alt", altIcon1);
                    day5El.appendChild(img);
                    day5El.appendChild(br);
                }
                if (j===2){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Temperature: " + data.daily[i].temp.day + "\u00B0F";
                    day5El.appendChild(p);
                    day5El.appendChild(br);
                }
                if (j===3){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Wind: " + data.daily[i].wind_speed + " mph"
                    day5El.appendChild(p);
                    day5El.appendChild(br);
                }
                if (j===4){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    p.innerText = "Humidity: " + data.daily[i].humidity + "%"
                    day5El.appendChild(p);
                    day5El.appendChild(br);
                }
            }
        }
    }
};

//event listener for the form submit
cityFormEl.addEventListener("submit", formSubmitHandler);

//adds event listeners to each history button
var putEventListeners = function(){
    for(i=0;i<localStorage.length;i++) {
        historyBtn[i].addEventListener("click", historyClicked);
    }
}

//initializes the webpage
init();

//for loop that adds event listeners upon page load to the history cities
for(i=0;i<localStorage.length;i++) {
    historyBtn[i].addEventListener("click", historyClicked);
}