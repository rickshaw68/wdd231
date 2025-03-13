document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#current-year").textContent = new Date().getFullYear();
    document.querySelector("#last-updated").textContent = document.lastModified;

    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const directory = document.getElementById("cards");

    if (!gridButton || !listButton || !directory) {
        console.error("Grid/List toggle elements not found!");
        return;
    }

    let membersData = [];

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            membersData = data.members;
            displayMembers(membersData, "grid");
        })
        .catch(error => console.error("Error fetching members:", error));

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
});

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

