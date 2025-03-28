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
        type: [String],
        required: true,
    },
    // the questions in the quiz
    questions: {
        type: [questionSchema],
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    // the url of the course image
    imageUrl: {
        type: String,
        required: true,
    },
    // the name of the course
    name: {
        type: String,
        required: true,
    },
    // description of the course
    description: {
        type: String,
        required: true, 
    },
    // the materials in the course
    // to be modified
    materials: {
        type: [String],
        default: [],
    },
    // the quizzes in the course
    quizzes: {
        type: [quizSchema],
        default: [],
    },
});

// export the models so that they can be used in other files and functions
const Question = mongoose.model('Question', questionSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const Course = mongoose.model('Course', courseSchema);
export { Question, Quiz, Course };

// export the schema so that it can be used in User.js
export default courseSchema;
