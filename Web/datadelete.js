async function deleteData() {
    const user = sessionStorage.getItem("userid")
    const response = await fetch('http://localhost:9670/deleteUserData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: user })
    });

    const result = await response.json();
    console.log(result);

    if (result.text == "Success") {
        window.location.href = "index.html"
    } else {
        alert("Nem sikerült törölni az adatot!!")
    }

}


async function deleteHabitData() {
    const user = sessionStorage.getItem("userid")
    const response = await fetch('http://localhost:9670/deleteUserHabitData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: user })
    });

    const result = await response.json();
    console.log(result);

    if (result.text == "Success") {
        window.location.href = "mainpage.html"
    } else {
        alert("Nem sikerült törölni az adatot!!")
    }
}


