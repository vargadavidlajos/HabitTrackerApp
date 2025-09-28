document.addEventListener("DOMContentLoaded", async () => {
    const habits = await getHabits();

    const params = new URLSearchParams(window.location.search);
    const habitName = params.get("name");
    const habitType = params.get("type");

    const timestamps = getHabitTimestampsByName(habits, habitName);

    /*const timestamps = [
        "2025-09-25-12-00",
        "2025-09-27-08-30",
        "2025-09-20-00-00",
        "2025-09-17-00-00"
    ];*/

    const daysAgoList = calculateDaysAgo(timestamps);

    const table = document.getElementById("calendar-table");
    const allCells = Array.from(table.querySelectorAll("td"));

    allCells.forEach((cell, index) => {
        console.log("current index: ", index);
        if (daysAgoList.includes(index)) {
            if (habitType == 1) {
                cell.classList.add("achieved");
            } else {
                cell.classList.add("failed");
            }
        }
    });

    let streakCount = 0;
    if (habitType == 1) {
        for (let i = 1; ; i++) {
            if (daysAgoList.includes(i)) {
                streakCount++;
            } else {
                break;
            }
        }
        if (streakCount == 0 && !daysAgoList.includes(0)) {
            streakCount = 1;
        }
    }
    else {
        for (let i = 1; ; i++) {
            if (daysAgoList.includes(i)) {
                break;
            } else {
                streakCount++;
            }
        }
        if (streakCount == 0 && !daysAgoList.includes(0)) {
            streakCount = 1;
        }
    }

    const streakElement = document.getElementById("streak-number");
    if (streakCount > 0) {
        streakElement.textContent = streakCount + "\u{1F31F}";
    }
});

document.getElementById("viewhabit-back").addEventListener("click", function() {
    window.location.href = "mainpage.html";
});

function calculateDaysAgo(dateStrings) {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const currentDate = new Date(todayStr);

    const msPerDay = 1000 * 60 * 60 * 24;

    return dateStrings.map(str => {
        const dateStr = str.split("-").slice(0, 3).join("-");
        const inputDate = new Date(dateStr);
        const diffInMs = currentDate - inputDate;
        return Math.floor(diffInMs / msPerDay);
    });
}

function getHabitTimestampsByName(habitData, targetHabitName) {
    return habitData
        .filter(habit => habit.habit_name === targetHabitName && habit.habit_date)
        .map(habit => {
            const date = new Date(habit.habit_date);

            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const HH = String(date.getHours()).padStart(2, '0');
            const MM = String(date.getMinutes()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}-${HH}-${MM}`;
        });
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