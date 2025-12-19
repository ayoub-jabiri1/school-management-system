// <-- 1. Main Selectors -->

let openNavBtn = document.getElementById("open-nav"),
    closeNavBtn = document.getElementById("close-nav"),
    navBar = document.getElementById("nav-bar"),
    learnersPageBody = document.getElementById("learners-table-body"),
    addLearnerBtn = document.getElementById("add-learner-btn");

// <-- 2. Handle the nav bar -->

openNavBtn.addEventListener("click", () => {
    navBar.classList.replace("left-[-250px]", "left-0");
});

closeNavBtn.addEventListener("click", () => {
    navBar.classList.replace("left-0", "left-[-250px]");
});

// <-- 3. Learners Management -->

let learners = [
    // { id: 1, firstName: "Alice", lastName: "Johnson", group: 1 },
    // { id: 2, firstName: "Bob", lastName: "Smith", group: 2 },
    // { id: 3, firstName: "Charlie", lastName: "Davis", group: 1 },
    // { id: 4, firstName: "Diana", lastName: "Miller", group: 3 },
    // { id: 5, firstName: "Ethan", lastName: "Wilson", group: 2 },
];

// Get data from localstorage
if (localStorage.getItem("learners")) {
    learners = getItemFromLocalStorage("learners");
}

setLearnersInPage();

// Add new learner
let popup = document.getElementById("add-learner-popup"),
    registerBtn = document.getElementById("register-learner-btn"),
    cancelBtn = document.getElementById("cancel-adding-btn"),
    firstNameInput = document.getElementById("add-first-name"),
    lastNameInput = document.getElementById("add-last-name"),
    groupInput = document.getElementById("add-group");

addLearnerBtn.addEventListener("click", () => {
    popup.classList.replace("hidden", "flex");
});

registerBtn.addEventListener("click", () => {
    if (firstNameInput.value && lastNameInput && groupInput.value) {
        let user = {
            id: learners.length + 1,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            group: groupInput.value,
        };

        // Add new learner to learners array
        learners.push(user);

        // Update table in page
        setLearnersInPage();

        // Reset inputs
        firstNameInput.value = "";
        lastNameInput.value = "";
        groupInput.value = "";

        // Hide pop up
        popup.classList.replace("flex", "hidden");
    }
});

cancelBtn.addEventListener("click", () => {
    // Hide pop up
    popup.classList.replace("flex", "hidden");
});

// <-- 3. Absence Register -->

let absences = [];

//get the previous data

absences = JSON.parse(localStorage.getItem("absences"));

document
    .getElementById("registre-absence")
    .addEventListener("click", function () {
        let id = document.getElementById("input-id").value;

        let date = document.getElementById("input-date").value;

        //creat an abssence obj for storag
        let abs = {
            learnerId: id,
            date: date,
        };

        //we have to storag that obj in the global array
        absences.push(abs);
        // reset the inputs
        document.getElementById("input-id").value = "";
        document.getElementById("input-date").value = "";

        //we have to stock thr data in loc storange:

        localStorage.setItem("absences", JSON.stringify(absences));
    });

// <-- 4. Delay Register -->

let button = document.getElementById("delay-register-btn");
let delays = [];

delays = JSON.parse(localStorage.getItem("delays"));

button.addEventListener("click", function () {
    let id = document.getElementById("id").value;

    let time = document.getElementById("time").value;

    let reason = document.getElementById("reason").value;

    let del = {
        learnerId: id,
        time: time,
        reason: reason,
    };
    delays.push(del);
    console.log(delays);

    //nous velons que lorsqu'on clique sur les buttons les inputes se vident
    document.getElementById("id").value = "";
    document.getElementById("time").value = "";
    document.getElementById("reason").value = "";

    //localstorage
    localStorage.setItem("delays", JSON.stringify(delays));
});

// <-- Main Functions -->

function setLearnersInPage() {
    // Empty the table
    learnersPageBody.innerHTML = "";

    // Set learners in the body
    for (let learner of learners) {
        learnersPageBody.innerHTML += `
            <tr
                class="block w-full px-2 py-4 not-last:border-b not-last:border-[#888080]"
            >
                <td class="w-[50px] text-center">${learner.id}</td>
                <td class="w-[150px] text-center">${learner.firstName}</td>
                <td class="w-[150px] text-center">${learner.lastName}</td>
                <td class="w-[150px] text-center">${learner.group}</td>
                <td class="w-[150px] text-center">
                    <button
                        id="update-learner"
                        class="main-btn text-sm w-[90px] py-2"
                        onclick="updateLearner(${learner.id})"
                    >
                        Update
                    </button>
                </td>
                <td class="w-[150px] text-center">
                    <button
                        id="delete-learner"
                        class="main-btn text-sm w-[90px] py-2"
                        onclick="removeLearner(${learner.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }

    // Set learners array in localStorage
    setItemInLocalStorage("learners", learners);
}

function updateLearner(id) {
    let currentLearnerIndex = learners.indexOf(
        learners.find((learner) => learner.id == id)
    );

    let firstName = prompt("Enter the learner's new first name");
    let lastName = prompt("Enter the learner's new last name");
    let group = prompt("Enter the learner's group");

    if (firstName != null && lastName != null && group != null) {
        learners[currentLearnerIndex] = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            group: group,
        };

        // Update the table in the page and localstorage
        setLearnersInPage();
    } else {
        alert("You have to enter all the required data!");
    }
}

function removeLearner(id) {
    let currentLearnerIndex = learners.indexOf(
        learners.find((learner) => learner.id == id)
    );

    learners.splice(currentLearnerIndex, 1);

    setLearnersInPage();
}

function setItemInLocalStorage(itemKey, ItemValue) {
    localStorage.setItem(itemKey, JSON.stringify(ItemValue));
}

function getItemFromLocalStorage(itemKey) {
    return JSON.parse(localStorage.getItem(itemKey));
}
