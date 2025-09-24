const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 9670;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Habit Tracker");
})
