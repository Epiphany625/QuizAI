import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractTextFromFile(filePath) {
    return new Promise((resolve, reject) => {
        // Resolve the file path to absolute
        const resolvedFilePath = path.resolve(filePath);

        // Check if file exists
        if (!fs.existsSync(resolvedFilePath)) {
            return reject(`File does not exist: ${resolvedFilePath}`);
        }

        // Get file stats for metadata
        const fileStats = fs.statSync(resolvedFilePath);

        // Determine file type
        const fileType = path.extname(resolvedFilePath).toLowerCase().replace('.', '');

        // Spawn the Python process
        const pythonProcess = spawn('python', [path.join(__dirname, 'file_extractor.py'), resolvedFilePath]);

        let output = '';
        let errorOutput = '';

        // Collect stdout
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Collect stderr
        pythonProcess.stderr.on('data', (data) => {
            console.error('Python stderr:', data.toString());
            errorOutput += data.toString();
        });

        // Handle process exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const parsedOutput = JSON.parse(output);

                    // Add metadata to the result
                    const metadata = {
                        fileName: path.basename(resolvedFilePath),
                        fileSize: fileStats.size, // in bytes
                        filePath: resolvedFilePath,
                        fileType: fileType,
                        extractionTimestamp: new Date().toISOString(),
                    };

                    const resultWithMetadata = {
                        metadata,
                        extracted_text: parsedOutput.extracted_text,
                    };

                    resolve(resultWithMetadata);
                } catch (err) {
                    reject(`Error parsing JSON output: ${err.message}`);
                }
            } else {
                reject(`Python script exited with code ${code}: ${errorOutput}`);
            }
        });
    });
}
