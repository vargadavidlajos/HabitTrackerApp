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



app.listen(PORT, () => {
    console.log(`Running Habit Tracker backend on port: ${PORT}`);
})
