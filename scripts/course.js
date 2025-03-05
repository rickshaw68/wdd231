document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courses = document.querySelectorAll(".course-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            courses.forEach(course => {
                if (filter === "All" || course.getAttribute("data-category") === filter) {
                    course.style.display = "flex";
                } else {
                    course.style.display = "none";
                }
            });
        });
    });
});
