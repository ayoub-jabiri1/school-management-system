// 1. <-- Main Selectors -->

let roleButtons = document.querySelectorAll("#roles button"),
    adminRoleBtn = document.getElementById("admin-btn"),
    learnerRoleBtn = document.getElementById("learner-btn"),
    adminPage = document.getElementById("admin-page"),
    learnerPage = document.getElementById("learner-page"),
    adminSignInSection = document.getElementById("admin-sign-in"),
    adminSignUpSection = document.getElementById("admin-sign-up"),
    adminToggleSignIn = document.getElementById("admin-toggle-sign-in"),
    adminToggleSignUp = document.getElementById("admin-toggle-sign-up");

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

// 3. <-- Toggle Authentication Pages -->

adminToggleSignUp.addEventListener("click", () => {
    toggleAuthentication(adminSignInSection, adminSignUpSection);
});
adminToggleSignIn.addEventListener("click", () => {
    toggleAuthentication(adminSignUpSection, adminSignInSection);
});

// 4. <-- Handle Admin Authentication -->

let adminIdInput = document.getElementById("admin-id-input"),
    adminFirstNameInput = document.getElementById("admin-first-name-input"),
    adminLastNameInput = document.getElementById("admin-last-name-input"),
    adminSignInBtn = document.getElementById("admin-sign-in-btn"),
    adminSignUpBtn = document.getElementById("admin-sign-up-btn");

let admins = JSON.parse(localStorage.getItem("admins")) || [];

// Handle sign in
adminSignInBtn.addEventListener("click", () => {
    let currentId = adminIdInput.value,
        check = false;

    // Check if the admin is registred
    if (currentId != "") {
        for (let admin of admins) {
            if (admin.id == currentId) {
                check = true;

                window.location = "admin.html";
                break;
            }
        }

        // If the admin is not registered
        if (!check) {
            showPopup("fail", "You are not registred!");
        }
    }
});

// Handle sign up
adminSignUpBtn.addEventListener("click", () => {
    let firstName = adminFirstNameInput.value;
    let lastName = adminLastNameInput.value;

    if (firstName != "" && lastName != "") {
        let currentId = admins.length + 1;
        admins.push({
            id: currentId,
            firstName: firstName,
            lastName: lastName,
        });

        showPopup(
            "success",
            `You are now registered, and your ID: "${currentId}"`
        );

        localStorage.setItem("admins", JSON.stringify(admins));

        // Reset inputs
        adminFirstNameInput.value = "";
        adminLastNameInput.value = "";
    }
});

// 5. <-- Handle Learner Sign in -->

let learnerFisrtNameInput = document.getElementById("learner-first-name-input"),
    learnerLastNameInput = document.getElementById("learner-last-name-input"),
    learnerIdInput = document.getElementById("learner-id-input"),
    learnerSignInBtn = document.getElementById("learner-sign-in-btn");

let learners = JSON.parse(localStorage.getItem("learners")) || [];

learnerSignInBtn.addEventListener("click", () => {
    let currentfirstName = learnerFisrtNameInput.value.toLowerCase(),
        currentlastName = learnerLastNameInput.value.toLowerCase(),
        currentId = learnerIdInput.value,
        check = false,
        failError = "";

    if (currentfirstName != "" && currentlastName != "" && currentId != "") {
        // Check if the learner is registered
        for (let learner of learners) {
            // If the learner is registred
            if (
                learner.id == currentId &&
                learner.firstName.toLowerCase() == currentfirstName &&
                learner.lastName.toLowerCase() == currentlastName
            ) {
                // Set the current learner id in the localeStorage
                localStorage.setItem("currentLearnerId", currentId);

                window.location = "learner.html";
                check = true;
                break;
            } else if (
                learner.id != currentId &&
                learner.firstName.toLowerCase() != currentfirstName &&
                learner.lastName.toLowerCase() != currentlastName
            ) {
                // If the learner is not registred
                failError = "You are not registred!";
            } else {
                // If some of the given data is not correct
                failError = "Some of the given data is not correct!";
            }
        }

        // Show the encoutered error
        if (!check) {
            showPopup("fail", failError);
        }
    }
});

// Functions

function toggleAuthentication(currentPage, targetPage) {
    currentPage.classList.replace("flex", "hidden");

    targetPage.classList.replace("hidden", "flex");
}

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
