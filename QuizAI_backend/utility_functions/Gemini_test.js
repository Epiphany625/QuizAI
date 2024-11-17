/**
 * @file Gemini_test.js
 * @description Contains the test code for the Gemini API.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { generateQuiz } from './Gemini_API.js';
import dotenv from 'dotenv';
dotenv.config();


const http = fs.readFileSync('./utility_functions/sample content/sample_http.txt', 'utf8');
const tcpip = fs.readFileSync('./utility_functions/sample content/sample_tcpip.txt', 'utf8');
const osi = fs.readFileSync('./utility_functions/sample content/sample_osi.txt', 'utf8');

// Pass the model instance to generateQuiz
generateQuiz(http, 5, "short-answer"); // Added model parameter