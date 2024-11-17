import fs from 'fs';
import parseQuizToJson from './json_parser.js';


let mcqText = `# Which organ is responsible for pumping blood throughout the body? # A) Brain B) Heart C) Kidney D) Liver --- B
# what's the power house of the cell? # A) cell wall B) cellulose string C) mitochondria D) Liver --- C`;
let shortAnswerText = `# Which organ is responsible for pumping blood throughout the body? # Brain
# what's the power house of the cell? # mitochondria`;


const quizJson = parseQuizToJson(shortAnswerText, "short answer");
const jsonString = JSON.stringify(quizJson, null, 2);
// print out the json string
console.log(jsonString);

// fs.writeFile('quiz.json', jsonString, (err) => {
//   if (err) {
//     console.error('Error writing to file', err);
//   } else {
//     console.log('File written successfully');
//   }
// });