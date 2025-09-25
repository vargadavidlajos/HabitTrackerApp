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
  // egyelőre csak teszt üzenet
  alert(`Registration successful!\ Username: ${username}`);
});
