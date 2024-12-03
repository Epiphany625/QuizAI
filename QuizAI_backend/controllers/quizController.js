import { generateQuiz } from '../utility_functions/Gemini_API.js';

export const postQuiz = async (req, res) => {
    console.log("post quiz...");
    console.log(req.body.webContent);
    const quiz = await generateQuiz(req.body.webContent);
    res.status(200).json({quiz: quiz});
}