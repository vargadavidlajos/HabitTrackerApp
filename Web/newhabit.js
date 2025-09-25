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