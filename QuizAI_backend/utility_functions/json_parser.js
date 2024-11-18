/**
 * @file json_parser.js
 * @description Contains the functions for parsing the quiz raw text into JSON format.
 * example json output:
 * [
 *   {
 *     question: "What is TCP/IP?",
 *     choices: ["TCP", "IP", "TCP/IP", "HTTP"],
 *     correctAnswer: "TCP/IP"
 *   },
 *   ...
 * ]
 */
function parseQuizToJson(quizText, questionType="mcq") {
  if (questionType === "multiple-choice" || questionType === "true-false") {
      return parseMCQToJson(quizText);
  } else if (questionType === "short-answer") {
      return parseShortAnswerToJson(quizText);
  } else if (questionType === "fill-in-the-blank") {
      return parseFillInTheBlankToJson(quizText);
  }
}


function parseMCQToJson(quizText) {
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

function parseFillInTheBlankToJson(quizText) {
return parseShortAnswerToJson(quizText);
}


function parseFillInTheBlankToJson(quizText) {
  return parseShortAnswerToJson(quizText);
}

function parseShortAnswerToJson(quizText) {
    const quizJson = [];
    
    // Split by # but keep the delimiter
    const parts = quizText.split(/(#)/).map(part => part.trim()).filter(part => part !== '');
    
    for (let i = 0; i < parts.length - 2; i++) {
        if (parts[i] === '#') {
            const question = parts[i + 1];
            const answer = parts[i + 3];
            
            if (question && answer) {
                quizJson.push({
                    question: question.trim(),
                    choices: [],
                    correctAnswer: answer.trim()
                });
            }
            i += 3; // Skip processed parts
        }
    }
    
    return quizJson;
}



export default parseQuizToJson;