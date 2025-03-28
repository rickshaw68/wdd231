console.log("join.js script loaded");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("joinForm");
    form.addEventListener("submit", function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            form.classList.add("submitted");
            console.log("Form invalid — .submitted class added");
        } else {
            console.log("Form is valid — proceeding");
        }
    });


    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const infoButtons = document.querySelectorAll(".info-button");
    const closeButtons = document.querySelectorAll(".close-button");

    infoButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "block";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-close");
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "none";
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    const orgInput = document.getElementById("orgTitle");
    const errorSpan = document.getElementById("orgTitleError");
    const orgPattern = /^[A-Za-z\s\-]{7,}$/;

    console.log("Org input element:", orgInput);
    console.log("Error span element:", errorSpan);


    orgInput.addEventListener("input", () => {
        const value = orgInput.value.trim();

        if (!orgPattern.test(value)) {
            orgInput.style.borderColor = "red";
            errorSpan.textContent = "Minimum 7 characters. Only letters, spaces, and hyphens allowed.";
        } else {
            orgInput.style.borderColor = "";
            errorSpan.textContent = "";
        }
    });


});






