

// register.js
// --------------------------------------------
document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("The two passwords don't match!");
        return;
    }
    if (password.length < 8) {
        alert("The password must be at least 8 characters long!");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert("The password must contain at least 1 capital letter (A-Z)!");
        return;
    }
    if (!/[0-9]/.test(password)) {
        alert("The password must contain at least 1 number!");
        return;
    }

    console.log(username, password)
    const result = register(username, password)

    if (result) {
        // egyelőre csak teszt üzenet
        alert(`Registration successful!\ Username: ${username}`);
        window.location.href = "index.html"
    } else {
        alert(`Registration failed!`);
    }
});

async function register(username, password) {
    const response = await fetch('http://localhost:9670/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });
    const result = await response.json();
    console.log(result);

    if (result.text == "Success") {
        return true
    } else {
        return false
    }
}


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

  alert(`Új szokás hozzáadva:\nNév: ${habitName}\nTípus: ${habitType}`);
  
  // később itt lehet majd az adatbázisba menteni
});


// teszt.js -> mainpage része
// --------------------------------------------
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