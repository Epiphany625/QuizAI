// this file contains the file parser utility function that will be used to parse user's files
// ***** can be modified to output text directly instead of writing txt file to output directory ****


import fs from 'fs-extra';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import textract from 'textract';
import tesseract from 'tesseract.js';

/**
 * Parses files from the input path and saves the output to the output directory.
 *
 * @param {string} inputPath - The path to the input file or directory. Supports PDF, DOCX, PPTX, PNG, JPG, JPEG, BMP, and GIF file types.
 * @param {string} outputDir - The path to the output directory to store the text output parsed from files. 
 */
export const parseFiles = async (inputPath, outputDir) => {
  // Ensure the output directory exists
  fs.ensureDirSync(outputDir);

  // Determine if inputPath is a file or directory
  let files = [];
  const stats = fs.statSync(inputPath);
  if (stats.isDirectory()) {
    // Read all files in the directory
    const fileNames = await fs.readdir(inputPath);
    files = fileNames.map(fileName => path.join(inputPath, fileName));
  } else if (stats.isFile()) {
    files = [inputPath];
  } else {
    console.error('Input path is neither a file nor a directory.');
    return;
  }

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName).toLowerCase();

    console.log(`\nProcessing ${fileName}...`);

    switch (ext) {
      case '.pdf':
        await parsePDF(filePath, fileName, outputDir);
        break;
      case '.docx':
        await parseDOCX(filePath, fileName, outputDir);
        break;
      case '.pptx':
        await parsePPTX(filePath, fileName, outputDir);
        break;
      case '.png':
      case '.jpg':
      case '.jpeg':
      case '.bmp':
      case '.gif':
        await parseImage(filePath, fileName, outputDir);
        break;
      default:
        console.log(`Unsupported file type: ${ext}`);
    }
  }
};

/**
 * Parse PDF Files
 */
const parsePDF = async (filePath, fileName, outputDir) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    const outputTextPath = path.join(outputDir, `${fileName}.txt`);
    await fs.writeFile(outputTextPath, data.text);
    console.log(`Extracted text from PDF: ${outputTextPath}`);
  } catch (error) {
    console.error(`Error parsing PDF (${fileName}):`, error);
  }
};

/**
 * Parse DOCX Files
 */
const parseDOCX = async (filePath, fileName, outputDir) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const outputTextPath = path.join(outputDir, `${fileName}.txt`);
    await fs.writeFile(outputTextPath, result.value);
    console.log(`Extracted text from DOCX: ${outputTextPath}`);
  } catch (error) {
    console.error(`Error parsing DOCX (${fileName}):`, error);
  }
};

/**
 * Parse PPTX Files
 */
const parsePPTX = (filePath, fileName, outputDir) => {
  textract.fromFileWithPath(filePath, async (error, text) => {
    if (error) {
      console.error(`Error parsing PPTX (${fileName}):`, error);
    } else {
      const outputTextPath = path.join(outputDir, `${fileName}.txt`);
      await fs.writeFile(outputTextPath, text);
      console.log(`Extracted text from PPTX: ${outputTextPath}`);
    }
  });
};

/**
 * Parse Image Files
 */
const parseImage = async (filePath, fileName, outputDir) => {
  try {
    console.log(`Performing OCR on image: ${fileName}`);

    const { data: { text } } = await tesseract.recognize(filePath, 'eng', {
      logger: m => console.log(`Progress: ${(m.progress * 100).toFixed(2)}%`),
    });

    const outputTextPath = path.join(outputDir, `${fileName}.txt`);
    await fs.writeFile(outputTextPath, text);
    console.log(`Extracted text from image: ${outputTextPath}`);
  } catch (error) {
    console.error(`Error parsing image (${fileName}):`, error);
  }
};

// Export the parseFiles function
export default {
  parseFiles,
};
