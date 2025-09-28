document.addEventListener("DOMContentLoaded", async () => {
    const habitList = document.getElementById("habit-list");

    try {
        const habits = await getHabits(); // wait for backend response
        console.log("h,", habits)

        if (!habits) {
            habitList.textContent = "No habits found.";
            return;
        }

        habitList.innerHTML = ""

        for (let i = 0; i < habits.length - 1; i++) {
            console.log("tt", habits[0][i])
            if (habits[0][i]["type"] == 0) {
                habitList.innerHTML += `
                    <div value=${habits[0][i]["habit_id"]} class="button-container">
                        <button class="red-button habit">
                            <span>${habits[0][i]["habit_name"]}</span>
                        </button>
                        <button class="completion-button"></button>
                    </div>`
            } else {
                habitList.innerHTML += `
                    <div value=${habits[0][i]["habit_id"]} class="button-container">
                        <button class="blue-button habit">
                            <span>${habits[0][i]["habit_name"]}</span>
                        </button>
                        <button class="completion-button"></button>
                    </div>`
            }
        }

        /*habits.forEach(habit => {


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
        });*/
    } catch (error) {
        console.error("Error loading habits:", error);
        habitList.textContent = "Error loading habits.";
    }

    const habitButtons = document.querySelectorAll('.habit');
    habitButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonContainer = event.target.parentElement;
            const habitId = buttonContainer.getAttribute('value');
            const habitType = event.target.classList.includes('blue-button') ? 1 : 0;
            const habitName = event.target.firstElementChild.textContent;

            sessionStorage.setItem('habit_id', habitId);
            sessionStorage.setItem('habit_type', habitType);
            sessionStorage.setItem('habit_name', habitName);
            window.open("viewhabit.html");
        });
    });

    const completionButtons = document.querySelectorAll('.completion-button');
    completionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // change color of button
            event.target.classList.add('achieved');
            
            // rest of completion saving logic
        });
    });
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

    if (result.text == "Success") {
        return result.data
    } else {
        return null
    }
}
