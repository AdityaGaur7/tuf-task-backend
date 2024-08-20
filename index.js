require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize Express
const app = express();
const port = process.env.PORT || 5000; // Use the port from .env or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI; // Use MongoDB URI from .env file
const client = new MongoClient(uri);
let db;

client.connect(err => {
    if (err) throw err;
    db = client.db('flashcards'); // Choose your database name
    console.log('Connected to MongoDB database');
});

// API Routes
app.get('/api/flashcards', async (req, res) => {
    try {
        const flashcards = await db.collection('flashcards').find({}).toArray();
        res.json(flashcards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const result = await db.collection('flashcards').insertOne({ question, answer });
        res.json({ id: result.insertedId, question, answer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const result = await db.collection('flashcards').updateOne(
            { _id: new MongoClient.ObjectId(id) },
            { $set: { question, answer } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.json({ id, question, answer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.collection('flashcards').deleteOne({ _id: new MongoClient.ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.json({ message: 'Flashcard deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Hello World ! backend is working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
