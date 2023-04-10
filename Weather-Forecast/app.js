const apiKey = "3ca96972c0e45ee6ce137284088d50e4";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchForm = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

export async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (
      data.weather[0].main == "Drizzle" &&
      data.weather[0].icon == "01d"
    ) {
      weatherIcon.src = "images/drizzle.png";
    } else if (
      data.weather[0].main == "Mist" &&
      data.weather[0].icon == "01d"
    ) {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchForm.value);
});

searchForm.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchForm.value);
  }
});
