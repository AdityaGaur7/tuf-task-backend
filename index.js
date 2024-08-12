require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Initialize Express
const app = express();
const port = process.env.PORT || 5000; // Use the port from .env or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API Routes
app.get('/api/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.get('/', (req, res) => {
    
        res.send("Hello World ! backend is working");
    });


app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, question, answer });
    });
});

app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
        if (err) throw err;
        res.json({ id, question, answer });
    });
});

app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Flashcard deleted' });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
