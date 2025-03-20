const addBtn = document.getElementById("addMood");
const clearBtn = document.getElementById("clearMoods");
const list = document.getElementById("ul");

function loadMoods() {
    list.innerHTML = ""; // Clear the list before reloading
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    
    savedMoods.forEach((moodObj) => {
        createMoodElement(moodObj.mood, moodObj.time);
    });
}

function getFormattedDate() {
    const now = new Date();
    const options = { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return now.toLocaleDateString(undefined, options);
}

function createMoodElement(mood, time) {
    const moodDiv = document.createElement("div");
    moodDiv.classList.add("history");

    const Mood = document.createElement("li");
    Mood.textContent = mood;

    const timePara = document.createElement("p");
    timePara.textContent = `Your Mood On This Day: ${time}`;

    list.appendChild(moodDiv);
    moodDiv.appendChild(Mood);
    moodDiv.appendChild(timePara);
}

addBtn.addEventListener("click", () => {
    const formattedTime = getFormattedDate();
    const dropDown = document.getElementById("mood");
    const selectedMood = dropDown.selectedOptions[0].text;

    // Save mood data in loca lStorage
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    savedMoods.unshift({ mood: selectedMood, time: formattedTime }); // Add to the beginning
    localStorage.setItem("moodHistory", JSON.stringify(savedMoods));

    loadMoods(); // Reload list instead of adding one-by-one
});



clearBtn.addEventListener("click", () => {
    localStorage.removeItem("moodHistory");
    list.innerHTML = ""; 
});

window.addEventListener("load", loadMoods);
