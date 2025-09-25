document.getElementById("register-form").addEventListener("submit", function(e) {
  e.preventDefault(); // ne küldje el azonnal

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("A két jelszó nem egyezik!");
    return;
  }
  if (password.length < 8) {
    alert("A jelszónak legalább 8 karakter hosszúnak kell lennie!");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    alert("A jelszónak tartalmaznia kell legalább 1 nagybetűt!");
    return;
  }
  if (!/[0-9]/.test(password)) {
    alert("A jelszónak tartalmaznia kell legalább 1 számot!");
    return;
  }

  // egyelőre csak teszt üzenet
  alert(`Sikeres regisztráció!\nFelhasználónév: ${username}`);
});