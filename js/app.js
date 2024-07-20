/** TODO: Build the navigation bar using JavaScript **/
const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");

sections.forEach((section) => {
    let navLink = document.createElement("li");
    navLink.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    navbar.appendChild(navLink);
});

/** TODO: Add smooth scrolling **/
navbar.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        event.preventDefault();
        document.querySelector(event.target.getAttribute("href")).scrollIntoView({ behavior:"smooth" });
    }
});
/** TODO: Add an active state **/

/** TODO: Add a comment form **/
