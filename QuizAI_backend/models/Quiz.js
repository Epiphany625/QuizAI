// models/Quiz.js
// defines question schema and quiz schema
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    choices: {
        type: [String],
        default: [],
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});

const quizSchema = new mongoose.Schema({
    // the url of the webpage / file on which the quiz is based
    url: {
        type: String,
        required: true,
    },
    // the questions in the quiz
    questions: {
        type: [questionSchema],
        required: true,
    },
});

export default quizSchema;