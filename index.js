const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./config');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type']
}));

app.options('*', cors());

// Connect to MongoDB
connectDB();

// API Routes
app.get("/", (req, res) => {
    res.send("App is running");
});

app.get('/api/flashcards', async (req, res) => {
    try {
        const db = getDB();
        const flashcards = await db.collection('cards').find({}).toArray();
        res.send({ result: flashcards, success: true });
    } catch (err) {
        res.status(500).send({ result: 'Error fetching flashcards', success: false });
    }
});

app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const db = getDB();
        const result = await db.collection('cards').insertOne({ question, answer });
        res.send({ result: { id: result.insertedId, question, answer }, success: true });
    } catch (err) {
        res.status(500).send({ result: 'Error adding flashcard', success: false });
    }
});
app.put('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const db = getDB();
        const result = await db.collection('cards').updateOne(
            { _id: new ObjectId(id) },
            { $set: { question, answer } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send({ result: 'Flashcard not found', success: false });
        }
        res.send({ result: { id, question, answer }, success: true });
    } catch (err) {
        console.error('Error updating flashcard:', err);  // Log the error for debugging
        res.status(500).send({ result: 'Error updating flashcard', error: err.message, success: false });
    }
});

app.delete('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        const result = await db.collection('cards').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send({ result: 'Flashcard not found', success: false });
        }
        res.send({ result: 'Flashcard deleted', success: true });
    } catch (err) {
        console.error('Error deleting flashcard:', err);  // Log the error for debugging
        res.status(500).send({ result: 'Error deleting flashcard', error: err.message, success: false });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
