import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { generateQuiz } from './Gemini_API.js';
import dotenv from 'dotenv';
dotenv.config();



// initialize the model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("model successfully created.");


const http = fs.readFileSync('./utility_functions/sample content/sample_http.txt', 'utf8');
const tcpip = fs.readFileSync('./utility_functions/sample content/sample_tcpip.txt', 'utf8');
const osi = fs.readFileSync('./utility_functions/sample content/sample_osi.txt', 'utf8');

generateQuiz(http + tcpip + osi, 3, "short answer"); // use testContent for testing, imported from prompt.js