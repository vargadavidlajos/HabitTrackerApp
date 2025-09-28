console.log("t", sessionStorage.getItem("userid"))

fetch("teszt.json")
    .then(response => response.json())
    .then(data => {
        const habitList = document.getElementById("habit-list");

        Object.entries(data.habits).forEach(([habitName]) => {
            const habitDiv = document.createElement("div");
            habitDiv.classList.add("habit");

            const nameSpan = document.createElement("span");
            nameSpan.textContent = habitName;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            habitDiv.appendChild(nameSpan);
            habitDiv.appendChild(checkbox);

            habitList.appendChild(habitDiv);
        });
    })
    .catch(error => console.error("Hiba a JSON betöltésénél:", error));
