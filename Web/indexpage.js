//index page
async function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const response = await fetch('http://localhost:9670/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });
    const result = await response.json();
    console.log(result);

    console.log(result.userid)
    sessionStorage.setItem("userid", result.userid);
    console.log("storage", sessionStorage.getItem("userid"))

    if (result.text == "Success") {
        window.location.href = "mainpage.html"
    } else {
        alert("Login failed!")
    }
}
