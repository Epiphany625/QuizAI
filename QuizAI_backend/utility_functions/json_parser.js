function parseQuizToJson(quizText, questionType="mcq") {
    if (questionType === "mcq" || questionType === "t/f") {
        return parseMCQToJson(quizText);
    } else if (questionType === "short answer") {
        return parseShortAnswerToJson(quizText);
    } else {
      return parseMCQToJson(quizText); // default to mcq
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

function parseShortAnswerToJson(quizText) {
  // Add debug logging
  console.log("Incoming quiz text:", quizText);
  
  const quizJson = [];
  let currentQuestion = null;

  // Split the text into parts using # as boundaries and filter empty strings
  const parts = quizText.split('#').map(part => part.trim()).filter(part => part !== '');
  
  // Add debug logging
  console.log("Parsed parts:", parts);

  // Process pairs of parts (question and answer)
  for (let i = 0; i < parts.length; i += 2) {
    const question = parts[i];
    const answer = parts[i + 1];

    if (question && answer) {
      currentQuestion = {
        question: question.trim(),
        choices: [],
        correctAnswer: answer.trim()
      };
      quizJson.push(currentQuestion);
    }
  }

  // Add debug logging
  console.log("Final JSON:", quizJson);
  
  return quizJson;
}



export default parseQuizToJson;