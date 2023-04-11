const apiKey = "3ca96972c0e45ee6ce137284088d50e4";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

export async function checkWeather(city) {
  let url;
  if (city) {
    url = apiURL + city + `&appid=${apiKey}`;
  } else {
    const { coords } = await getCurrentLocation();
    const { latitude, longitude } = coords;
    url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }

  const response = await fetch(url);

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

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Adaugarea listenerilor de evenimente pentru căutarea vremii
searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
  }
});

// Căutarea vremii pentru locația curentă la încărcarea paginii
window.onload = async () => {
  try {
    const { coords } = await getCurrentLocation();
    checkWeather();
  } catch (error) {
    console.log("Unable to retrieve location:", error);
  }
};
