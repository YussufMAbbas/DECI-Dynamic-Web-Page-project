const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const commentFormUsername = document.querySelector("#name");
const commentFormEmail = document.querySelector("#email");
const commentFormSubmit = document.querySelector("#submit");
const commentFormComment = document.querySelector("#comment")
const comments = document.querySelector(".comments")

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

commentFormSubmit.addEventListener("click", (event) => {
    // Validation and Appending of comments to the comment section

    /* Validation */
    event.preventDefault();
    let usernameIsValid = false;
    let emailIsValid = false;
    let commentIsValid = false;
    /* Username Validation (left blank) */
    if (commentFormUsername.value === "") {
        commentFormUsername.previousElementSibling.classList.add("warning")
        commentFormUsername.classList.add("warning");
        if (commentFormUsername.nextElementSibling.nodeName === "SPAN") {
            commentFormUsername.nextElementSibling.textContent =
                " This field is required";
        } else {
            commentFormUsername.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\">This field is required</span>"
            );
        }
    } else {
        usernameIsValid = true;
        if (commentFormUsername.nextElementSibling.nodeName === "SPAN") {
            commentFormUsername.previousElementSibling.classList.remove("warning");
            commentFormUsername.classList.remove("warning");
            commentFormUsername.nextElementSibling.remove();
        }
    }

    /* Email Validation (left blank OR invalid) */
    if (commentFormEmail.value === "") {
        commentFormEmail.previousElementSibling.classList.add("warning");
        commentFormEmail.classList.add("warning");
        if (commentFormEmail.nextElementSibling.nodeName === "SPAN") {
            commentFormEmail.nextElementSibling.textContent =
                " This field is required";
        } else {
            commentFormEmail.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\">This field is required</span>"
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
                "<span class=\"warning\">Email is invalid</span>"
            );
        }
    }
    else {
        emailIsValid = true;
        if (commentFormEmail.nextElementSibling.nodeName === "SPAN") {
            commentFormEmail.previousElementSibling.classList.remove("warning");
            commentFormEmail.classList.remove("warning");
            commentFormEmail.nextElementSibling.remove();
        }
    }

    /* Comment Validation (left blank) */
    if (commentFormComment.value === "") {
        commentFormComment.classList.add("warning");
        if (commentFormComment.nextElementSibling.nodeName === "SPAN") {
            commentFormComment.nextElementSibling.textContent =
                " This field is required";
        } else {
            commentFormComment.insertAdjacentHTML(
                "afterend",
                "<span class=\"warning\">This field is required</span>"
            );
        }
    } else {
        commentIsValid = true;
        if (commentFormComment.nextElementSibling.nodeName === "SPAN") {
            commentFormComment.classList.remove("warning");
            commentFormComment.nextElementSibling.remove();
        }
    }

    /* Appending Comment */
    if (usernameIsValid && emailIsValid && commentIsValid) {
        const newComment = document.createElement("div")
        newComment.classList.add("comment-block");
        newComment.innerHTML = `<div class="personal-info">
            <img src="avatar-3814049_1920.png" alt="Picture of ${commentFormUsername}" width="50" />
                            <span>${commentFormUsername.value} (${commentFormEmail.value})</span>
                        </div>
                        <hr />
                        <div class="comment">
                            <p>
                                ${commentFormComment.value}
                            </p>
                        </div>
                    </div>
                </div>`
        comments.appendChild(newComment);
        for (let elem of [commentFormUsername, commentFormEmail, commentFormComment]) {
            elem.classList.remove("warning");
            elem.value = ""
        }
        document.querySelectorAll("label").classList.remove("warning")
        document.querySelectorAll(".warning").remove();
    }
});
