const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Initialize the SQLite database
const db = new sqlite3.Database('./users.db');

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT,
    password TEXT
)`);

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(400).json({ error: 'User already exists' });
        }
        res.json({ message: 'Registration successful' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
