export function setupNavigation() {
  const menuButton = document.getElementById('menu');
  const navLinks = document.querySelector('.nav-links');
  const nav = document.getElementById('animateme');

  // hamburger menu
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    nav.classList.toggle('slide-in');
  });

  // wayfinding for menu
  const links = navLinks.querySelectorAll('a');
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.setAttribute("aria-current", "page");
      link.parentElement.classList.add("current-menu-item");
    }

    // will close the menu on a link select in the mobile view
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      nav.classList.remove("slide-in");
    });
  });
}
