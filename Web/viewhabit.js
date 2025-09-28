document.addEventListener("DOMContentLoaded", async () => {
    const habits = await getHabitData();
    
    const timestamps = formatTimestamps(habits[0]);

    /*const timestamps = [
        "2025-09-25-12-00",
        "2025-09-27-08-30",
        "2025-09-20-00-00",
        "2025-09-17-00-00"
    ];*/

    const daysAgoList = calculateDaysAgo(timestamps);

    const table = document.getElementById("calendar-table");
    const allCells = Array.from(table.querySelectorAll("td"));
    const habitName = sessionStorage.getItem("habit_name");
    const habitType = sessionStorage.getItem("habit_type");

    const habitNameBanner = document.getElementById('habit_name');
    habitNameBanner.textContent = habitName;

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

function formatTimestamps(timestamps) {
    
    const completionTimes = [];
    
    timestamps.forEach((timestamp) => {
        const completionTime = cleanAndFormatDate(timestamp['habit_date']);
        completionTimes.push(completionTime);
    });

    return completionTimes;
}

function cleanAndFormatDate(rawString) {
    const match = rawString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z/);

    if (!match) return null;

    const isoDate = match[0];
    const date = new Date(isoDate);

    const yyyy = date.getFullYear();
    const mm   = String(date.getMonth() + 1).padStart(2, '0');
    const dd   = String(date.getDate()).padStart(2, '0');
    const HH   = String(date.getHours()).padStart(2, '0');
    const MM   = String(date.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}-${HH}-${MM}`;
}

async function getHabitData() {
    const habit_id = sessionStorage.getItem("habit_id")
    const response = await fetch('http://localhost:9670/getHabitData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habit_id: habit_id })
    });

    const result = await response.json();
    console.log(result);

    if (result.text == "Success") {
        return result.data
    } else {
        return null
    }
}