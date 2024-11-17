/**
 * @file Gemini_API.js  
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import parseQuizToJson from './json_parser.js';
import dotenv from 'dotenv'
import { getQuizPrompt, summaryInstructions, testContent } from './prompt.js';
dotenv.config();


// error checking
const apiKey = process.env.GOOGLE_AI_KEY;
if (!apiKey) {
    throw new Error("API key is missing. run file in the backend folder and do node utility_functions/Gemini_API.js");
}

// initialize the model
let model;
try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} catch (err) {
    console.error('Error initializing Gemini model:', err);
    throw new Error('Failed to initialize Gemini model');
}


// generate a streaming summary of the content
// didn't make one for quiz generation because formatting 
async function generateStreamingSummary(content) {
    try {
        const instructions = summaryInstructions;
        const result = await model.generateContentStream(instructions + content);
        
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            // You can also implement custom handling of each chunk here
        }
        
        return result.text;  // Changed from result.response.text()
    } catch (err) {
        console.error('Error processing streaming summary:', err);
    }
}


// study guide/requirements

async function generateSummary(content){
    try {
        const instructions = summaryInstructions;
        const resultText = await promptModel(instructions + content);
        console.log(resultText);
        return resultText;
    } catch (err) {
        console.error('Error processing summary:', err);
    }
}



async function generateQuiz(content, numQuestions=10, questionType="multiple choice", exampleQuestion=null) {
    try {
        // const data = fs.readFileSync('./prompt.txt', 'utf8');
        const prompt = getQuizPrompt(content, numQuestions, questionType, exampleQuestion);
        const resultText = await promptModel(prompt);
        // Check if we got a valid response
        if (!resultText) {
            throw new Error('No response received from AI model');
        }
        console.log(resultText);
        const jsonOutput = parseQuizToJson(resultText, questionType);
        console.log(jsonOutput);
        return jsonOutput;
        
    } catch (err) {
        console.error('Error processing quiz:', err);
        return null; // or return a specific error object that your frontend can handle
    }
}


// general helper function for prompting the model and returning the text
// may add cached context to the prompt in the future
async function promptModel(prompt){
    try {
        const result = await model.generateContent(prompt);
        const resultText = result.response.text();
        return resultText;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}


export { generateQuiz, generateStreamingSummary, generateSummary };