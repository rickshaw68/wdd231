document.querySelector("form").addEventListener("submit", (e) => {
    const formData = new FormData(e.target);
    const dataObject = {};

    formData.forEach((value, key) => {
        dataObject[key] = value;
    });

    localStorage.setItem("formSubmission", JSON.stringify(dataObject));
});
