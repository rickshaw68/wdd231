document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const totalCreditsDisplay = document.createElement("p");
    totalCreditsDisplay.id = "total-credits";
    coursesContainer.parentElement.appendChild(totalCreditsDisplay);
    
    const courses = [
        {
            subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true
        },
        {
            subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true
        },
        {
            subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true
        },
        {
            subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true
        },
        {
            subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true
        },
        {
            subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false
        }
    ];

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-item");
            courseDiv.dataset.category = course.subject;

            if (course.completed) {
                courseDiv.classList.add("completed");
                courseDiv.innerHTML = `<strong>${course.subject} ${course.number}</strong><br>${course.title} ✅`;
            } else {
                courseDiv.classList.add("not-completed");
                courseDiv.innerHTML = `<strong>${course.subject} ${course.number}</strong><br>${course.title} ❌`;
            }

            coursesContainer.appendChild(courseDiv);
        });


        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    }


    displayCourses(courses);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            if (filter === "All") {
                displayCourses(courses);
            } else {
                const filteredCourses = courses.filter(course => course.subject === filter);
                displayCourses(filteredCourses);
            }
        });
    });
});
