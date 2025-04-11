export async function loadDestinations(jsonPath) {
    const container = document.getElementById("destination-cards");
    if (!container) return;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Failed to fetch destination data");

        const destinations = await response.json();

        destinations.forEach((dest) => {
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
    } catch (error) {
        container.innerHTML = `<p class="error">Error loading destinations: ${error.message}</p>`;
        console.error("Error loading destinations:", error);
    }
}
