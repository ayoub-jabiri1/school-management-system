// Main Selectors
let openNavBtn = document.getElementById("open-nav"),
    closeNavBtn = document.getElementById("close-nav"),
    navBar = document.getElementById("nav-bar");

// Show and hide the nav bar

openNavBtn.addEventListener("click", () => {
    navBar.classList.replace("left-[-250px]", "left-0");
});
closeNavBtn.addEventListener("click", () => {
    navBar.classList.replace("left-0", "left-[-250px]");
});

// Toggle pages

let navBtns = document.querySelectorAll("nav button"),
    pages = document.querySelectorAll(".page-content > div");

navBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let pageId = btn.dataset.page;

        // Remove show-page class from all pages and add it on the targeted page
        pages.forEach((page) => page.classList.remove("show-page"));
        document.getElementById(pageId).classList.add("show-page");

        // Remove active class from all buttons and add it on clicked button
        navBtns.forEach((btn) => btn.classList.remove("main-btn"));
        e.target.classList.add("main-btn");

        // Hide the side bar
        navBar.classList.replace("left-0", "left-[-250px]");
    });
});

// Log out

document.getElementById("log-out").addEventListener("click", () => {
    window.location = "index.html";
});

function showPopup(type, text) {
    let popup = document.getElementById(
        `${type == "success" ? "success-pop-up" : "fail-pop-up"}`
    );

    popup.classList.remove("hidden");
    popup.innerHTML = text;

    setTimeout(() => {
        popup.classList.add("hidden");
    }, 3000);
}
