import { extractTextFromFile } from '../utility_functions/file_extractor_caller.js';

export const postParse = async (req, res) => {
    const parsedContent = extractTextFromFile(req.body.file);
    res.status(200).json({parsedContent});
}