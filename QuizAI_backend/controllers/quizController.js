import { generateQuiz } from '../utility_functions/Gemini_API.js';
import User from '../models/user.js';

export const postQuiz = async (req, res) => {
    console.log("post quiz...");
    console.log(req.body.numQuestions);
    const num = req.body.numQuestions ?? 10;
    const type = req.body.questionType ?? 'multiple-choice';
    const example = req.body.exampleQuestion ?? null;

    // generate the quiz
    const quiz = await generateQuiz(req.body.content, num, type, example);

    // save the quiz to the database, if the user has selected a course
    if(req.body.course){
        const courseName = req.body.course; 
        const user = await User.findOne({email: req.body.email});

        for(let i = 0; i < user.courses.length; i++){
            if(user.courses[i].name === courseName){
                const currCourse = user.courses[i];
                const newQuiz = new Quiz({url: req.body.url, questions: []});
                for(let j = 0; j < quiz.length; j++) {
                    const currQuestion = quiz[j];
                    const newQuestion = new Question({question, choices, correctAnswer});
                    newQuiz.questions.push(newQuestion);
                }
                currCourse.quizzes.push(newQuiz);
            }
        }
    }
    res.status(200).json({quiz: quiz});
}