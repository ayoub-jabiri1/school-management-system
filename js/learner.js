// dashboard
let id = localStorage.getItem("currentLearnerId");
let countAbsence = 0;
let countDelays = 0;

let firstName = document.querySelectorAll(".firstName"),
    lastName = document.querySelectorAll(".lasttName"),
    groupeEducation = document.querySelectorAll("#groupe"),
    totalDaysRecorded = document.getElementById("totalDaysRecorded"),
    nbAbsence = document.querySelector("#nbOfAbsence"),
    nbDelays = document.querySelector("#nbOfDelays"),
    attendance = document.getElementById("attendanceRate"),
    statusInformations = document.getElementById("status"),
    absenceRate = document.querySelector("#absenceRate"),
    delaysRate = document.querySelector("#delaysRate"),
    nbDaysPresent = document.getElementById("nbOfDaysPresent"),
    avaregeTime = document.getElementById("averageTimeOfLateArrival");

let learnersStudent = JSON.parse(localStorage.getItem("learners")) || [];
let absence = JSON.parse(localStorage.getItem("absences")) || [];
let delays = JSON.parse(localStorage.getItem("delays")) || [];

function getItemFromLocalStorage(id) {
    let learner = learnersStudent.find((l) => l.id == id);
    if (!learner) return;
    firstName.forEach((el) => {
        el.textContent = learner.firstName;
    });
    lastName.forEach((el) => {
        el.textContent = learner.lastName;
    });
    groupeEducation.forEach((el) => {
        el.textContent = learner.group;
    });

    for (let i = 0; i < absence.length; i++) {
        if (id == absence[i].learnerId) {
            countAbsence++;
        }
    }
    nbAbsence.textContent = countAbsence;
    for (let i = 0; i < delays.length; i++) {
        if (id == delays[i].learnerId) {
            countDelays++;
        }
    }
    nbDelays.textContent = countDelays;

    if (countAbsence > 2 || countDelays > 3) {
        statusInformations.textContent = "Frequently absent";
    } else if (countAbsence < 2 || countDelays < 3) {
        statusInformations.textContent = " Keep an eye on";
    } else {
        statusInformations.textContent = "Diligent";
    }
    let daysRecorded = countAbsence + countDelays;

    totalDaysRecorded.textContent = daysRecorded;
    absenceRate.textContent = (countAbsence * 100) / daysRecorded;
    delaysRate.textContent = (countDelays * 100) / daysRecorded;
}
getItemFromLocalStorage(id);
