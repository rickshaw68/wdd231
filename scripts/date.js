document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#current-year").textContent = new Date().getFullYear();
    document.querySelector("#last-updated").textContent = document.lastModified;
});
