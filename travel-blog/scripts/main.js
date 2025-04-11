import { loadDestinations } from './modules/destinations.js';
import { setupNavigation } from './modules/nav.js';
import { updateFooter } from './modules/footer.js';
import { loadWeather } from './modules/weather.js';
import { setupModal } from './modules/modal.js';

// DOM section
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateFooter();
    loadWeather();
    setupModal();
    setupFlightLookup();
    loadTravelTip();

    // determine which script to load
    const path = window.location.pathname;

    if (path.includes('road.html')) {
        loadDestinations('data/road-destinations.json');
    } else if (path.includes('cruise.html')) {
        loadDestinations('data/cruise-destinations.json');
    } else if (path.includes('index.html') || path.endsWith('/')) {
        loadFeaturedDestinations();
    }

    async function loadFeaturedDestinations() {
        const container = document.getElementById("destination-cards");
        if (!container) return;
      
        const roadData = await fetch('data/road-destinations.json').then(res => res.json());
        const cruiseData = await fetch('data/cruise-destinations.json').then(res => res.json());
      
        // Pick one random destination from each
        const randomRoad = roadData[Math.floor(Math.random() * roadData.length)];
        const randomCruise = cruiseData[Math.floor(Math.random() * cruiseData.length)];
      
        const allFeatured = [randomRoad, randomCruise];
      
        allFeatured.forEach(dest => {
          const card = document.createElement("div");
          card.classList.add("destination-card");
          card.dataset.name = dest.name;
          card.dataset.location = dest.location;
          card.dataset.description = dest.description;
          card.dataset.besttime = dest.bestTime;
          card.dataset.image = dest.image;
      
          card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" width="400" height="225" loading="lazy">
            <h3>${dest.name}</h3>
            <p>${dest.location}</p>
            <button class="open-modal">More Info</button>
          `;
      
          container.appendChild(card);
        });
      }
      

    function setupFlightLookup() {
        const form = document.getElementById("flight-form");
        const results = document.getElementById("flight-results");
      
        if (!form || !results) return; // exit if elements aren't found (safe for other pages)
      
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const flightNumber = document.getElementById("flight-number").value.trim();
          if (!flightNumber) return;
      
          const apiKey = "cff193351eaddc9fd220a1242deb8e6c";
          const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;
      
          results.innerHTML = "Loading...";
      
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
      
            if (data.data && data.data.length > 0) {
              const flight = data.data[0];
              results.innerHTML = `
                <h3>Flight ${flight.flight.iata}</h3>
                <p><strong>Status:</strong> ${flight.flight_status}</p>
                <p><strong>From:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
                <p><strong>To:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
                <p><strong>Departure Time:</strong> ${flight.departure.scheduled}</p>
                <p><strong>Arrival Time:</strong> ${flight.arrival.scheduled}</p>
              `;
            } else {
              results.innerHTML = "<p>No flight data found. Please check your flight number.</p>";
            }
          } catch (error) {
            results.innerHTML = `<p>Error fetching flight data: ${error.message}</p>`;
            console.error("Aviationstack error:", error);
          }
        });
      }
      

      async function loadTravelTip() {
        const tipElement = document.getElementById("travel-tip");
      
        try {
          const response = await fetch("data/travel-tips.json");
          if (!response.ok) throw new Error("Failed to fetch travel tips");
      
          const tips = await response.json();
          const randomIndex = Math.floor(Math.random() * tips.length);
          tipElement.textContent = `💡 ${tips[randomIndex].tip}`;
        } catch (error) {
          console.error("Error loading travel tip:", error);
          tipElement.textContent = "Couldn't load a travel tip at this time.";
        }
      }
      
      
});
