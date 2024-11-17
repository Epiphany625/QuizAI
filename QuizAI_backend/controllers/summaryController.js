import { generateSummary } from '../utility_functions/Gemini_API.js';

export const getSummary = async (req, res) => {
    const summary = await generateSummary(req.body.webContent);
    res.status(200).json({summary: summary});
}