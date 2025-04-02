document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#current-year").textContent = new Date().getFullYear();
    document.querySelector("#last-updated").textContent = document.lastModified;

    const container = document.querySelector(".discover-container");

    async function loadDiscoverItems() {
        try {
            const response = await fetch("data/discover.json");
            if (!response.ok) throw new Error("Failed to fetch data.");

            const data = await response.json();
            displayItems(data.discover);
        } catch (error) {
            console.error("Error loading discover items:", error);
        }
    }

    function displayItems(items) {
        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name} image" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button>Learn More</button>
            `;

            container.appendChild(card);
        });
    }

    loadDiscoverItems();

    // tracking visitors
    const visitMessage = document.querySelector("#visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastTime = Number(lastVisit);
        const difference = now - lastTime;
        const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (daysPassed === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysPassed === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysPassed} days ago.`;
        }
    }

    //timestamp
    localStorage.setItem("lastVisit", now);
});
