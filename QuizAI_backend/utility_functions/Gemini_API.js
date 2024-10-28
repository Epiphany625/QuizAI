const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCXQk8rR1R02XT1cacQfyr9fYP3VBe1HCI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fs = require('fs');

function parseQuizToJson(quizText) {
    const quizJson = [];
    let currentQuestion = null;
    let correctAnsLeft = false;
    let isQuestion = false;
  
    // Split the text into parts using specific markers as boundaries
    const parts = quizText.split(/(?=#)|(?<=#)|(?=---)|(?<=---)|(?=[A-D]\))/g).map(part => part.trim()).filter(part => part !== '');
  
    parts.forEach(part => {
      if (part.startsWith('#') || part.endsWith('#')) {
        isQuestion = !isQuestion;
      } else if (isQuestion){
        if (currentQuestion) {
            quizJson.push(currentQuestion);
          }
          currentQuestion = {
            question: part.trim(),
            choices: [],
            correctAnswer: ''
          };
      } else if (part.match(/^[A-D]\)\s(.*)/)) {
        if (currentQuestion) {
          const choiceText = part.substring(3).trim();
          currentQuestion.choices.push(choiceText);
        }
      } else if (part.startsWith('---')) {
        correctAnsLeft = true;
      } else if (correctAnsLeft) {
        if (currentQuestion) {
          currentQuestion.correctAnswer = part;
          correctAnsLeft = false;
        }
      }
    });
  
    if (currentQuestion) {
      quizJson.push(currentQuestion);
    }
  
    return quizJson;
  }


async function generateResponse() {
    try {
        const data = fs.readFileSync('prompt.txt', 'utf8');
        const result = await model.generateContent(data);
        console.log(parseQuizToJson(result.response.text()));
    } catch (err) {
        console.error('Error reading file:', err);
    }
}



generateResponse();
