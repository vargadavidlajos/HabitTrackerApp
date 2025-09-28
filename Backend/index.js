const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 9670;

app.use(cors({
    origin: "*"
}));
app.use(express.json());


const getConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pmamysql',
        database: 'HabitTracker',
    });
};

app.get('/', (req, res) => {
    res.send("Hello from Habit Tracker");
})

app.get('/Test', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        const [rows] = await connection.query('select * from User')
        console.log(rows)
        res.status(200).json(rows)
    } catch (error) {
        console.log("Error occured in /login", error)
        res.status(400).json({ text: "Bad Request" })
    } finally {
        if (connection) await connection.end()
        //close connection at the end
    }
})

app.post('/login', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        const { username, password } = req.body
        const [rows] = await connection.query('select * from User where username=?', [username])

        // no user with that username
        if (rows.length === 0) {
            return res.status(401).json({ text: 'Unauthorized' });
        }

        const user = rows[0];

        // Plain-text compare (ok for a demo; not for production)
        if (password === user.password) {
            return res.status(200).json({ text: 'Success', userid: user.id });
        } else {
            return res.status(401).json({ text: 'Unauthorized' });
        }
    } catch (error) {
        console.log("Error occured in /login", error)
        res.status(400).json({ text: "Bad Request" })
    } finally {
        if (connection) await connection.end()
        //close connection at the end
    }
})

app.post('/createUser', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        const { username, password } = req.body
        await connection.query('insert into User (username, password) values (?,?)', [username, password])
        res.status(201).json({ text: "Success" })
    } catch (error) {
        console.log("Error occured in /createUser", error)
        res.status(500).json({ text: "Server error" })
    } finally {
        if (connection) await connection.end()
        //close connection at the end
    }
})

app.post('/createHabit', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        console.log(req.body)
        const { userid, habitName, habitType } = req.body
        await connection.query('insert into Habit (id, user_id, name, isGoodHabit) values (NULL, ?,?,?)', [userid, habitName, habitType])
        res.status(201).json({ text: "Success" })
    } catch (error) {
        console.log("Error occured in /createHabit", error)
        res.status(500).json({ text: "Server error" })
    } finally {
        if (connection) await connection.end()
        //close connection at the end
    }
})

app.post('/getHabits', async (req, res) => {
    let connection

    try {
        connection = await getConnection();
        console.log(req.body)
        const { userid } = req.body
        const data = await connection.query('SELECT h.id AS habit_id, h.name AS habit_name FROM Habit h WHERE h.user_id = (?)', [userid])
        res.status(200).json({ text: "Success", data: data })
    } catch (error) {
        console.log("Error occured in /getHabits", error)
        res.status(500).json({ text: "Server error" })
    } finally {
        if (connection) await connection.end()
        //close connection at the end
    }
})

app.listen(PORT, () => {
    console.log(`Running Habit Tracker backend on port: ${PORT}`);
})


