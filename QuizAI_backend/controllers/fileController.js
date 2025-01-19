import User from '../models/User.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import parsePDF from '../utility_functions/pdf_parser.js';




// Configure multer globally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { email, name } = req.params;

    if (!email || !name) {
      return cb(new Error('Email or course name is missing.'));
    }

    const emailBody = email.split('@')[0];
    const uploadPath = path.join('uploads', emailBody, name);

    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage }).array('files', 10); // Allow up to 10 files, using 'files' as the field name


// handle file upload
export const uploadFiles = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      } else if (err) {
        console.error('Non-Multer error:', err);
        return res.status(500).json({ message: `Server error: ${err.message}` });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded.' });
      }

      const { email, name } = req.params;

      // Validate email and course name
      if (!email || !name) {
        return res.status(400).json({ message: 'Email and course name are required.' });
      }

      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Find the course
      const course = user.courses.find((course) => course.name === name);
      if (!course) {
        return res.status(404).json({ message: 'Course not found.' });
      }

      // do not allow files with the same name
      for (const file of req.files) {
        if (course.materials.includes(file.path)) {
          return res.status(400).json({ message: 'File already exists.' });
        }
      }

      // store the files in the course
      for (const file of req.files) {
        course.materials.push(file.path);
      }

      await user.save();

      console.log("file saved for user", email);

      // Success response
      res.status(200).json({
        message: 'Files uploaded successfully.',
        files: req.files.map((file) => ({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          size: file.size,
        })),
      });
    });
  } catch (error) {
    console.error('Error in uploadFiles:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// retrieve the files for a course
const getFiles = async (req, res) => {
  const { email, name } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const course = user.courses.find((course) => course.name === name);
    if (!course) {
      return res.status(404).json({ message: "course notfound" });
    }

    let materials = [];
    for (const material of course.materials) {
      const materialSplit = material.split('/');
      materials.push(materialSplit[materialSplit.length - 1]);
    }
    res.status(200).json({ materials });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }

}

export const parseMaterials = async (req, res) => {
  try {
    const { email, courseName, files } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const course = user.courses.find((c) => c.name === courseName);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    const emailBody = email.split('@')[0];
    const fileContents = {};
    let combinedText = '';
    for (const fileName of files) {
      const filePath = path.join('uploads', emailBody, courseName, fileName);
      const text = await parsePDF(filePath);
      fileContents[fileName] = text;
      combinedText += text + '\n';
    }

    res.status(200).json({
      parsedText: fileContents,
      combinedText,
    });
  } catch (error) {
    console.error('Error parsing materials:', error);
    res.status(500).json({ message: 'Failed to parse materials.' });
  }
};

export { getFiles };

