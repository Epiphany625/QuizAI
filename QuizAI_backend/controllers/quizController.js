import { generateQuiz } from '../utility_functions/Gemini_API.js';

export const postQuiz = async (req, res) => {
    console.log("post quiz...");
    console.log(req.body.numQuestions);
    const num = req.body.numQuestions ?? 10;
    const type = req.body.questionType ?? 'multiple-choice';
    const example = req.body.exampleQuestion ?? null;

    const quiz = await generateQuiz(req.body.content, num, type, example);
    res.status(200).json({quiz: quiz});
}