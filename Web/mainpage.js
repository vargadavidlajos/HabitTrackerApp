document.addEventListener("DOMContentLoaded", async () => {
    const habitList = document.getElementById("habit-list");

    try {
        const habits = await getHabits(); // wait for backend response

        if (!habits) {
            habitList.textContent = "No habits found.";
            return;
        }

        const habitNames = getHabitNames(habits);
        //const habitNamesWithTypes = [["habit1", "1"], ["habit2", "1"], ["anti-habit1", "0"]];
        
        habitNamesWithTypes.forEach(habit => {

            if (habit[1] == "1") {
                habitList.innerHTML += `
                    <div class="habit">
                        <span>${habit[0]}</span>
                    </div>
                `;
            }
            else {
                habitList.innerHTML += `
                    <div class="habit anti-habit">
                        <span>${habit[0]}</span>
                    </div>
                `;
            }
        });
    } catch (error) {
        console.error("Error loading habits:", error);
        habitList.textContent = "Error loading habits.";
    }
});

function getHabitNamesWithTypes(habits) {
    const uniqueMap = new Map();

    for (const habit of habits) {
        const name = habit.habit_name;
        const type = String(habit.isGoodHabit);

        if (!uniqueMap.has(name)) {
            uniqueMap.set(name, type);
        }
    }

    const result = Array.from(uniqueMap.entries()).sort((a, b) =>
        a[0].localeCompare(b[0])
    );

    return result;
}

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
