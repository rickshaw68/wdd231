document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.querySelector("nav");

    if (!menuButton || !navMenu) {
        console.error("Menu button or nav menu not found!");
        return;
    }

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            menuButton.textContent = "❌";
        } else {
            menuButton.textContent = "☰";
        }
    });
});
