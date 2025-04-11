export function setupModal() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("open-modal")) {
        const card = e.target.closest(".destination-card");
        if (!card) return;
  
        const modal = document.getElementById("modal");
        const modalContent = document.getElementById("modal-content");
  
        modalContent.innerHTML = `
          <h3>${card.dataset.name}</h3>
          <p><strong>Location:</strong> ${card.dataset.location}</p>
          <p><strong>Best Time:</strong> ${card.dataset.besttime}</p>
          <p>${card.dataset.description}</p>
          <img src="${card.dataset.image}" alt="${card.dataset.name}" loading="lazy">
        `;
  
        modal.classList.add("show");
      }
  
      if (e.target.id === "close-modal" || e.target.id === "modal") {
        document.getElementById("modal").classList.remove("show");
      }
    });
  }
  