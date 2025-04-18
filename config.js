// models/flashcard.js
const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
