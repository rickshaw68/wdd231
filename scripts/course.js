document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const totalCreditsDisplay = document.createElement("p");
    totalCreditsDisplay.id = "total-credits";
    coursesContainer.parentElement.appendChild(totalCreditsDisplay);

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]

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

            // adding the modal trigger
            courseDiv.addEventListener("click", () => showCourseModal(course));

            coursesContainer.appendChild(courseDiv);
        });


        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    }

    function showCourseModal(course) {
        const dialog = document.getElementById("course-details");

        dialog.innerHTML = `
            <div class="modal-content">
                <button class="close-button" aria-label="Close">&times;</button>
                <h2>${course.subject} ${course.number} - ${course.title}</h2>
                <p><strong>Description:</strong> ${course.description}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
                <p><strong>Completed:</strong> ${course.completed ? "Yes! ✅" : "No ❌"}</p>
            </div>
        `;

        dialog.classList.remove("fade-in");

        dialog.showModal();

        requestAnimationFrame(() => {
            dialog.classList.add("fade-in");
        });

        dialog.querySelector(".close-button").addEventListener("click", () => {
            dialog.close();
        });

        dialog.addEventListener("click", (e) => {
            const rect = dialog.querySelector(".modal-content").getBoundingClientRect();
            const isOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
            if (isOutside) dialog.close();
        });
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
