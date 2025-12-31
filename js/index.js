// 1. <-- Main Selectors -->

let roleButtons = document.querySelectorAll("#roles button"),
    adminRoleBtn = document.getElementById("admin-btn"),
    learnerRoleBtn = document.getElementById("learner-btn"),
    adminPage = document.getElementById("admin-page"),
    learnerPage = document.getElementById("learner-page"),
    adminSignInSection = document.getElementById("admin-sign-in"),
    adminSignUpSection = document.getElementById("admin-sign-up"),
    learnerSignInSection = document.getElementById("learner-sign-in"),
    learnerSignUpSection = document.getElementById("learner-sign-up"),
    adminToggleSignIn = document.getElementById("admin-toggle-sign-in"),
    adminToggleSignUp = document.getElementById("admin-toggle-sign-up"),
    learnerToggleSignIn = document.getElementById("learner-toggle-sign-in"),
    learnerToggleSignUp = document.getElementById("learner-toggle-sign-up");

// 2. <-- Toggle role -->

roleButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let pageId = btn.dataset.page;

        // Remove show-page class from all pages and add it on the targeted page
        [adminPage, learnerPage].forEach((page) =>
            page.classList.remove("show-page")
        );
        document.getElementById(pageId).classList.add("show-page");

        // Remove active-btn class from all and put it on the targeted button
        roleButtons.forEach((btn) => btn.classList.remove("active-btn"));
        e.target.classList.add("active-btn");
    });
});

// 3. <-- Toggle Authentication -->

adminToggleSignUp.addEventListener("click", () => {
    toggleAuthentication(adminSignInSection, adminSignUpSection);
});
adminToggleSignIn.addEventListener("click", () => {
    toggleAuthentication(adminSignUpSection, adminSignInSection);
});

learnerToggleSignUp.addEventListener("click", () => {
    toggleAuthentication(learnerSignInSection, learnerSignUpSection);
});
learnerToggleSignIn.addEventListener("click", () => {
    toggleAuthentication(learnerSignUpSection, learnerSignInSection);
});

// Functions

function toggleAuthentication(currentPage, targetPage) {
    currentPage.classList.replace("flex", "hidden");

    targetPage.classList.replace("hidden", "flex");
}
