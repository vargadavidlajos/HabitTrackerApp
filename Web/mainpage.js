document.addEventListener("DOMContentLoaded", async () => {
    const habitList = document.getElementById("habit-list");

    try {
        const habits = await getHabits(); // wait for backend response

        if (!habits) {
            habitList.textContent = "No habits found.";
            return;
        }

        // habits should be an array of { habit_id, habit_name }
        habits.forEach(habit => {
            const habitDiv = document.createElement("div");
            habitDiv.classList.add("habit");

            const nameSpan = document.createElement("span");
            nameSpan.textContent = habit.habit_name;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            habitDiv.appendChild(nameSpan);
            habitDiv.appendChild(checkbox);

            habitList.appendChild(habitDiv);
        });
    } catch (error) {
        console.error("Error loading habits:", error);
        habitList.textContent = "Error loading habits.";
    }
});

async function getHabits() {
    const user = sessionStorage.getItem("userid")
    const response = await fetch('http://localhost:9670/getHabits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: user })
    });

    const result = await response.json();
    console.log(result);

    if (result.text === "Success" && Array.isArray(result.habits)) {
        return result.habits
    } else {
        return null
    }
}
