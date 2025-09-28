// newhabit.js
// --------------------------------------------
document.getElementById("newhabit-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const habitName = document.getElementById("habit-name").value.trim();
    const habitType = document.getElementById("habit-type").value;

    if (!habitName) {
        alert("Adj meg egy szokás nevet!");
        return;
    }

    createHabit(habitName, habitType)

    alert(`Új szokás hozzáadva:\nNév: ${habitName}\nTípus: ${habitType}`);
});

async function createHabit(habitName, habitType) {
    const user = sessionStorage.getItem("userid")
    console.log("f", user)
    const response = await fetch('http://localhost:9670/createHabit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: user, habitName: habitName, habitType: habitType })
    });

    const result = await response.json();
    console.log(result);

    if (result.text == "Success") {
        return true
    } else {
        return false
    }
}


