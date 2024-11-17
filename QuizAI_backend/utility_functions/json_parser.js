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
  const quizJson = [];
  let currentQuestion = null;
  let isQuestion = false;

  // Split the text into parts using # as boundaries
  const parts = quizText.split(/(?=#)|(?<=#)/g).map(part => part.trim()).filter(part => part !== '');

  parts.forEach(part => {
    if (part === '#') {
      isQuestion = !isQuestion;
    } else if (isQuestion) {
      if (currentQuestion) {
        quizJson.push(currentQuestion);
      }
      currentQuestion = {
        question: part.trim(),
        choices: [],
        correctAnswer: ''
      };
    } else if (!isQuestion && currentQuestion) {
      currentQuestion.correctAnswer = part.trim();
    }
  });

  if (currentQuestion) {
    quizJson.push(currentQuestion);
  }

  return quizJson;
}



export default parseQuizToJson;