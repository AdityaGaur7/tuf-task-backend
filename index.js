require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Flashcard = require('./config.js'); // Import the Flashcard model

// Initialize Express
const app = express();
const port = process.env.PORT || 5000; // Use the port from .env or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;

// MongoDB Connection
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB database');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// API Routes
app.get('/api/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.json(flashcards);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const flashcard = new Flashcard({ question, answer });
        const savedFlashcard = await flashcard.save();
        res.json(savedFlashcard);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );
        if (!updatedFlashcard) {
            return res.status(404).send('Flashcard not found');
        }
        res.json(updatedFlashcard);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
        if (!deletedFlashcard) {
            return res.status(404).send('Flashcard not found');
        }
        res.json({ message: 'Flashcard deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/', (req, res) => {
    res.send("Hello World ! backend is working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
