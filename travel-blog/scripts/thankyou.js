document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("formSubmission") || "{}");

  document.getElementById("display-name").textContent = data.fullname || "N/A";
  document.getElementById("display-email").textContent = data.email || "N/A";
  document.getElementById("display-trip").textContent = formatTripType(data.tripType);
  document.getElementById("display-details").textContent = data.details || "N/A";

  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("last-updated").textContent = document.lastModified;
});

function formatTripType(type) {
  switch (type) {
    case "road": return "Road Trip";
    case "cruise": return "Cruise";
    case "international": return "International";
    default: return "N/A";
  }
}
