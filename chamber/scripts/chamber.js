const hamburgerElement = document.querySelector('#hamburger-menu');
const navElement = document.querySelector('#animateme');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#current-year").textContent = new Date().getFullYear();
    document.querySelector("#last-updated").textContent = document.lastModified;

    const apiKey = "bd29c3a8dd8bc968d44b939380716672";
    const city = "Calgary";
    const units = "metric";

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    // weather
    fetch(weatherURL)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching weather data:", error));

    fetch(forecastURL)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error("Error fetching weather forecast:", error));

    const isDirectoryPage = window.location.pathname.includes("directory.html");

    if (isDirectoryPage) {

        fetch("data/members.json")
            .then(response => response.json())
            .then(data => {
                displayMembers(data.members, "grid");
                setupGridListToggle(data.members);
            })
            .catch(error => console.error("Error fetching members:", error));
    } else {

        fetch("data/members.json")
            .then(response => response.json())
            .then(data => {
                displaySpotlightBusinesses(data.members);
            })
            .catch(error => console.error("Error fetching spotlight businesses:", error));
    }
});



function displayWeather(data) {
    const weatherContainer = document.querySelector(".weather");

    if (!weatherContainer) {
        console.error("Weather container not found!");
        return;
    }

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherContainer.innerHTML = `
    <h2>Current Weather</h2>
    <img src="${iconURL}" alt="${description}">
    <p><strong>${temperature}°C</strong></p>
    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector(".forecast");

    if (!forecastContainer) {
        console.error("Forecast container not found!");
        return;
    }

    let dailyForecasts = {};
    data.list.forEach(item => {
        let date = item.dt_txt.split(" ")[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    const forecastArray = Object.values(dailyForecasts).slice(1, 4);

    forecastContainer.innerHTML = `<h2>3-Day Forecast</h2>`;
    forecastArray.forEach(day => {
        let date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
        let temp = Math.round(day.main.temp);
        let desc = day.weather[0].description;
        let iconCode = day.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        forecastContainer.innerHTML += `
        <div class="forecast-day">
            <h3>${date}</h3>
            <img src="${iconURL}" alt="${desc}">
            <p><strong>${temp}°C</strong></p>
            <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        </div>
        `;
    });
}

async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
}

function displayMembers(members, viewMode) {
    const directory = document.getElementById("cards");
    directory.innerHTML = "";

    members.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("member");

        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        url.textContent = "Visit Website";
        url.href = member.url;
        url.target = "_blank";
        url.rel = "noopener noreferrer";

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(url);

        if (viewMode === "grid") {
            let image = document.createElement("img");
            image.setAttribute("src", member.image);
            image.setAttribute("alt", member.name);
            image.setAttribute("width", "100");
            image.setAttribute("height", "100");
            card.prepend(image);
        }

        directory.appendChild(card);
    });

    directory.classList.toggle("grid-view", viewMode === "grid");
    directory.classList.toggle("list-view", viewMode === "list");
}

function setupGridListToggle(membersData) {
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const directory = document.getElementById("cards");

    if (!gridButton || !listButton || !directory) {
        console.error("Grid/List toggle elements not found!");
        return;
    }

    gridButton.addEventListener("click", () => {
        directory.classList.add("grid-view");
        directory.classList.remove("list-view");
        displayMembers(membersData, "grid");
    });

    listButton.addEventListener("click", () => {
        directory.classList.add("list-view");
        directory.classList.remove("grid-view");
        displayMembers(membersData, "list");
    });
}


function displaySpotlightBusinesses(members) {
    const spotlightContainer = document.querySelector(".spotlight");

    if (!spotlightContainer) {
        console.error("Spotlight container not found!");
        return;
    }

    const eligibleMembers = members.filter(member =>
        member.level.toLowerCase() === "gold" || member.level.toLowerCase() === "silver"
    );

    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    const selectedBusinesses = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = "<h2>Business Spotlights</h2>";

    selectedBusinesses.forEach(member => {
        let card = document.createElement("div");
        card.classList.add("spotlight-card");

        let logo = document.createElement("img");
        logo.setAttribute("src", member.image);
        logo.setAttribute("alt", `${member.name} logo`);
        logo.classList.add("spotlight-logo");

        let name = document.createElement("h3");
        name.textContent = member.name;

        let address = document.createElement("p");
        address.textContent = member.address;

        let website = document.createElement("a");
        website.href = member.url;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(website);

        spotlightContainer.appendChild(card);
    });

    console.log("Spotlight businesses displayed:", selectedBusinesses);
}


