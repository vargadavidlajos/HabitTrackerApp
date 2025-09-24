const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 9670;

app.use(cors());
app.use(express.json());


const getConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'HabitTracker',
    });
};

app.get('/', (req, res) => {
    res.send("Hello from Habit Tracker");
})

app.get('/login', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        const { username, password } = req.body
        const [rows] = await connection.query('select * from user where username=' + username)

        if (username == rows.username && password == rows.password) {
            res.status(200).json({ text: "Success" })
        } else {
            res.status(401).json({ text: "Unauthorized" })
        }
    } catch (error) {
        console.log("Error occured in /login", error)
        res.status(400).json({ text: "Bad Request" })
    } finally {
        if (connection) await connection.end()
    }
})

app.listen(PORT, () => {
    console.log(`Running Habit Tracker backend on port: ${PORT}`);
})
