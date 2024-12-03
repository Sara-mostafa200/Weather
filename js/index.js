var city = document.querySelector("input");
var alertLocation = document.querySelector(".alert")
var loctionBtn = document.querySelector("#search");
var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthName;
var cityName;
var date = [];
var weatherList = [];

// get weather API

async function getWeather(key) {
  try{
    var res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=49e9bbd470ae4cc0823104748240112 &q=${key}&days=7&aqi=no&alerts=no`
  );
  var data = await res.json();
  weatherList = data;

  for (var i = 0; i < weatherList.forecast.forecastday.length; i++) {
    date[i] = new Date(weatherList.forecast.forecastday[i].date);
  }

  document.querySelector(".error ").classList.add("d-none")

}catch(error) {

  console.log("hi",error)
  if(error == "TypeError: Failed to fetch"){
 document.querySelector(".error ").classList.remove("d-none")
  }

 
  
}

  
  
}

// run function by order
async function arrange(city) {
  await getWeather(city);
  display();
}
arrange("cairo");

function Locationx() {
  var myLocation = navigator.geolocation;
  myLocation.getCurrentPosition(
    function (position) {
      var lat =position.coords.latitude;
      var long =position.coords.longitude;
      var currentLoction =lat+","+long
      arrange(currentLoction);
    },
    function (error) {
      alertLocation.classList.toggle("d-none")
    }
  );
}

loctionBtn.addEventListener("click", Locationx);

// on input run the functions again

city.addEventListener("input", changeCity);

// change city name in search field
function changeCity() {
  if (cityName == null) {
    cityName = "cairo";
  } else {
    cityName = city.value;
  }
  alertLocation.classList.add("d-none")
  arrange(cityName);
 
  
}

// display html function
function display() {
  var container = "";

  for (var i = 0; i < 1; i++) {
    container += `
    <div class="col-lg-6 col-12">
            <div class="today p-3">
              <div
                class="content d-flex align-items-start justify-content-evenly"
              >
                <div class="">
                  <p class="dayTitle">${(dayName = day[date[i].getDay()])}</p>

                  <h2>${weatherList.current.temp_c}<sup>o</sup>C</h2>
                </div>
                <div class="center d-flex flex-column">
                  <p class="dayTitle">
                  ${date[i].getDate()}
                  ${(monthName = month[date[i].getMonth()])}</p>
                  
  
                  <div class="info my-4">
                    <div
                      class="location d-flex align-items-center justify-content-around"
                    >
                      <i class="fa-solid fa-location-dot"></i>

                      <p class="m-0 ">${weatherList.location.name}</p>
                    </div>
                    <div
                      class="wind d-flex align-items-center justify-content-around"
                    >
                      <i class="fa-solid fa-wind"></i>
                      <p class="m-0">${
                        weatherList.current.wind_kph
                      } <span>km/h</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="status d-flex flex-column align-items-center justify-content-around"
              >
                <img
                  src="${weatherList.current.condition.icon}"
                  alt=""
                />
                <p class=" ">${weatherList.current.condition.text
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}</p>
              </div>
            </div>
          </div>
    `;
  }

  for (var i = 1; i < weatherList.forecast.forecastday.length; i++) {
    container += `
       <div class=" col-lg-3 col-md-4 col-12 ">
            <div class="day py-4 ">
            <p class="dayTitle">${(dayName = day[date[i].getDay()])}</p>
              <p class="date "> ${date[i].getDate()}
                  ${(monthName = month[date[i].getMonth()])}</p>
              <h2 class="">${
                weatherList.forecast.forecastday[i].day.maxtemp_c
              }<sup>o</sup>C</h2>
              <div
                class="status d-flex flex-column align-items-center justify-content-around"
              >

                <img
                  src="${
                    weatherList.forecast.forecastday[i].day.condition.icon
                  }"
                  alt=""
                  
                />
                <p class="statusText  ">${
                  weatherList.forecast.forecastday[i].day.condition.text
                }</p>
              </div>

            </div>
          </div>

     `;
  }

  document.querySelector(".home .row").innerHTML = container;
}
