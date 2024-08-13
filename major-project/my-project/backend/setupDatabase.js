const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./users.db');

// Create users table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT,
    password TEXT
  )`);
});

db.close();
