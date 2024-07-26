const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const commentFormUsername = document.querySelector("#name");
const commentFormEmail = document.querySelector("#email");
const commentFormSubmit = document.querySelector("#submit");
const commentFormComment = document.querySelector("#comment")

sections.forEach((section) => {
    // Loops over all the sections and adds them to the navbar in a "table of contents" sort of way.
    let navLink = document.createElement("li");
    navLink.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    navbar.appendChild(navLink);
});

navbar.addEventListener("click", (event) => {
    // Implements smooth scrolling to the sections
    if (event.target.nodeName === "A") {
        event.preventDefault();
        document
            .querySelector(event.target.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    }
});

document.addEventListener("scroll", () => {
    sections.forEach((section) => {
        // Adds active class to a section only if its top is exactly at
        // the top of the viewport AND its bottom is within it. Removes if not.
        // The first section is an exception to the top rule only when removing.
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
            section.classList.add("active");
        } else if (rect.bottom <= 0 || section !== sections[0]) {
            section.classList.remove("active");
        }
    });
});

/** TODO: Add a comment form **/

commentFormSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    if (commentFormEmail.value === "") {
        commentFormEmail.previousElementSibling.classList.add("warning");
        commentFormEmail.classList.add("warning");
        if (commentFormEmail.nextElementSibling.nodeName === "SPAN") {
            commentFormEmail.nextElementSibling.textContent =
                " This field is required";
        } else {
            commentFormEmail.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\"> This field is required</span>"
            );
        }
    } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(commentFormEmail.value)
        // Browser email validation algorithm equivalent RegExp (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation)
    ) {
        commentFormEmail.previousElementSibling.classList.add("warning");
        commentFormEmail.classList.add("warning");
        if (commentFormEmail.nextElementSibling.nodeName === "SPAN") {
            commentFormEmail.nextElementSibling.textContent =
                " Email is invalid";
        } else {
            commentFormEmail.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\"> Email is invalid</span>"
            );
        }
    }
    if (commentFormComment.value === "") {
        commentFormComment.classList.add("warning");
        if (commentFormComment.nextElementSibling.nodeName === "SPAN") {
            commentFormComment.nextElementSibling.textContent =
                " This field is required";
        } else {
            commentFormComment.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\"> This field is required</span>"
            );
        }
}});
