// <-- 1. Main Selectors -->

let learnersPageBody = document.getElementById("learners-table-body"),
    addLearnerBtn = document.getElementById("add-learner-btn"),
    historyPageBody = document.getElementById("history-table-body");

// <-- 2. Learners Management -->

let learners = [
    { id: 1, firstName: "Alice", lastName: "Johnson", group: 1 },
    { id: 2, firstName: "Bob", lastName: "Smith", group: 2 },
    { id: 3, firstName: "Charlie", lastName: "Davis", group: 1 },
    { id: 4, firstName: "Diana", lastName: "Miller", group: 3 },
    { id: 5, firstName: "Ethan", lastName: "Wilson", group: 2 },
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

        // Show success pop up
        showPopup("success", "Learner has been added successfully!");

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

if (localStorage.getItem("absences")) {
    absences = JSON.parse(localStorage.getItem("absences"));
}

document
    .getElementById("registre-absence")
    .addEventListener("click", function () {
        let id = document.getElementById("input-id").value;

        let date = document.getElementById("input-date").value;

        // creat an abssence obj for storag
        let abs = {
            learnerId: id,
            date: date,
        };

        // we have to storag that obj in the global array
        absences.push(abs);

        // Show success pop up
        showPopup("success", "Absence has been registered successfully!");

        // reset the inputs
        document.getElementById("input-id").value = "";
        document.getElementById("input-date").value = "";

        // Update history
        getHistoryData();

        // we have to stock thr data in loc storange:

        localStorage.setItem("absences", JSON.stringify(absences));
    });

// <-- 4. Delay Register -->

let button = document.getElementById("delay-register-btn");

let delays = [];

if (localStorage.getItem("delays")) {
    delays = JSON.parse(localStorage.getItem("delays"));
}

button.addEventListener("click", function () {
    let id = document.getElementById("id").value;

    let time = document.getElementById("time").value;

    let reason = document.getElementById("reason").value;
    let date = new Date().toLocaleString("en-CA");

    let del = {
        learnerId: id,
        time: time,
        reason: reason,
        date: date.slice(0, date.indexOf(",")),
    };

    delays.push(del);

    // Show success pop up
    showPopup("success", "Delay has been registered successfully!");

    //nous velons que lorsqu'on clique sur les buttons les inputes se vident
    document.getElementById("id").value = "";
    document.getElementById("time").value = "";
    document.getElementById("reason").value = "";

    // Update history
    getHistoryData();

    //localstorage
    localStorage.setItem("delays", JSON.stringify(delays));
});

// 5. History Page

let history = [];

// Get history data and set it in the page
getHistoryData();

// <-- App Functions -->

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

function getHistoryData() {
    history = [];

    // Get dates from absences table
    getDate(absences);

    // Get dates from absences table
    getDate(delays);

    // Get number absences
    getStats(absences, "absence");

    // Get number delays
    getStats(delays, "delay");

    setHistoryDataInPage();

    // Start local functions

    function getDate(array) {
        for (let el of array) {
            if (!history.find((obj) => obj.date == el.date)) {
                history.push({
                    date: el.date,
                    absence: {
                        count: 0,
                        learners: [],
                    },
                    delay: {
                        count: 0,
                        learners: [],
                    },
                });
            }
        }
    }

    function getStats(array, value) {
        for (let hist of history) {
            for (let el of array) {
                if (hist.date == el.date) {
                    hist[value].count++;
                    hist[value].learners.push(el.learnerId);
                }
            }
        }
    }
}

function setHistoryDataInPage() {
    // Empty the table
    historyPageBody.innerHTML = "";

    // Set hitory in the body
    for (let hist of history) {
        historyPageBody.innerHTML += `
            <tr
                class="block w-full px-2 py-4 not-last:border-b not-last:border-[#888080]"
            >
                <td class="w-[200px] text-center">
                    ${hist.date}
                </td>
                <td class="w-[200px] text-center">${hist.absence.count}</td>
                <td class="w-[200px] text-center">${hist.delay.count}</td>
                <td class="w-[200px] text-center">
                    <button
                        id="history-details"
                        class="main-btn bg-[#eee]! text-[#888080]! text-sm w-[90px] py-2 border border-[#888080]"
                        onclick="handleHistoryDetailsTable([${hist.absence.learners}], [${hist.delay.learners}])"
                    >
                        Details
                    </button>
                </td>
            </tr>
        `;
    }
}

function handleHistoryDetailsTable(absenceArray, delayArray) {
    // Selectors
    let detailsPopup = document.getElementById("histrory-popup"),
        absenceDetailsTable = document.getElementById(
            "absence-details-table-body"
        ),
        delayDetailsTable = document.getElementById(
            "delays-details-table-body"
        );

    // Filter the learners ids arrays from the dublicated ids
    let absenceLearnersIds = new Set(absenceArray),
        delayLearnersIds = new Set(delayArray);

    // Show the history details pop up
    detailsPopup.classList.replace("hidden", "flex");

    // Close the pop up
    document.getElementById("close-hitory").addEventListener("click", () => {
        detailsPopup.classList.replace("flex", "hidden");
    });

    // Set the absence details table
    absenceDetailsTable.innerHTML = "";
    for (let id of absenceLearnersIds) {
        let currentLearner = learners.find((learner) => learner.id == id);

        if (currentLearner) {
            absenceDetailsTable.innerHTML += `
            <tr
                class="block w-full px-2 py-4 not-last:border-b not-last:border-[#888080]"
            >
                <td class="w-[200px] text-center">
                    ${currentLearner.firstName}
                </td>
                <td class="w-[200px] text-center">
                    ${currentLearner.lastName}
                </td>
            </tr>
        `;
        }
    }

    // Set the delay details table
    delayDetailsTable.innerHTML = "";
    for (let id of delayLearnersIds) {
        let currentLearner = learners.find((learner) => learner.id == id);
        let currentLearnerDelayDetails = delays.find(
            (delay) => delay.learnerId == id
        );

        if (currentLearner && currentLearnerDelayDetails) {
            delayDetailsTable.innerHTML += `
            <tr
                class="block w-full px-2 py-4 not-last:border-b not-last:border-[#888080]"
            >
                <td class="w-[150px] text-center">
                    ${currentLearner.firstName}
                </td>
                <td class="w-[150px] text-center">
                    ${currentLearner.lastName}
                </td>
                <td class="w-[150px] text-center">
                    ${
                        currentLearnerDelayDetails.time != ""
                            ? currentLearnerDelayDetails.time
                            : "-"
                    }
                </td>
                <td class="w-[150px] text-center">
                    ${
                        currentLearnerDelayDetails.reason != ""
                            ? currentLearnerDelayDetails.reason
                            : "-"
                    }
                </td>
            </tr>
        `;
        }
    }
}
