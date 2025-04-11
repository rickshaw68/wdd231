const apiKey = "bd29c3a8dd8bc968d44b939380716672";
const units = "metric";

export function loadWeather(city = "Calgary") {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(weatherURL)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));

    fetch(forecastURL)
        .then((response) => response.json())
        .then((data) => displayForecast(data))
        .catch((error) => console.error("Error fetching forecast:", error));
}

function displayWeather(data) {
    const widget = document.getElementById("weather-widget");
    if (!widget || !data || !data.main) return;

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const iconAlt = data.weather[0].main;
    const cityName = data.name;

    widget.innerHTML = `
    <form id="city-search">
      <label for="city">Enter city:</label>
      <input type="text" id="city" name="city" placeholder="Search a city" required>
      <button type="submit">Search</button>
    </form>
    <div class="current-weather">
      <img src="${iconSrc}" alt="${iconAlt}">
      <span><strong>${cityName}</strong>: ${temp}&deg;C - ${description}</span>
    </div>
    <div class="forecast-container" id="forecast"></div>
  `;

    const form = document.getElementById("city-search");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newCity = document.getElementById("city").value.trim();
        if (newCity) {
            loadWeather(newCity);
        }
    });
}


function displayForecast(data) {
    const forecastContainer = document.getElementById("forecast");
    if (!forecastContainer || !data || !data.list) return;
    forecastContainer.innerHTML = "";

    const forecastMap = {};

    data.list.forEach(entry => {
        const date = new Date(entry.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        if (!forecastMap[day] && date.getHours() === 12) {
            forecastMap[day] = {
                temp: Math.round(entry.main.temp),
                icon: entry.weather[0].icon,
                alt: entry.weather[0].main
            };
        }
    });

    const days = Object.keys(forecastMap).slice(0, 3);
    days.forEach(day => {
        const { temp, icon, alt } = forecastMap[day];
        const iconSrc = `https://openweathermap.org/img/w/${icon}.png`;

        const card = document.createElement("div");
        card.classList.add("forecast-day");
        card.innerHTML = `
      <p><strong>${day}</strong></p>
      <img src="${iconSrc}" alt="${alt}" loading="lazy">
      <p>${temp}&deg;C</p>
    `;
        forecastContainer.appendChild(card);
    });
}
