import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import parseQuizToJson from './json_parser.js';
import dotenv from 'dotenv'
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function generateResponse() {
    try {
        // const data = fs.readFileSync('./prompt.txt', 'utf8');
        const data = `generate a quiz of five questions, following this format:
For example, the quizzes are:
Which planet is known as the Red Planet? A) Venus B) Jupiter C) Mars D) Saturn--- C
What is the chemical symbol for water? A) H2 B) O2 C) H2O D) CO2--- C
Who wrote the play "Romeo and Juliet"? A) William Shakespeare B) Charles Dickens C) Mark Twain D) Jane Austen--- A

Your answer should be in the format:
# Which planet is known as the Red Planet? # A) Venus B) Jupiter C) Saturn D) Mars --- B
# What is the chemical symbol for water? # A) H2 B) O2 C) H2O D) CO2 --- B
Etc. please do not omit the # sign. `;
        const result = await model.generateContent(data);
        console.log(parseQuizToJson(result.response.text()));
    } catch (err) {
        console.error('Error reading file:', err);
    }
}



generateResponse();
