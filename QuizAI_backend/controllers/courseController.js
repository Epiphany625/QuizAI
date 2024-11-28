import User from '../models/User.js';

// GET request to get all the courses of a user
export const getCourses = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        res.status(200).json(user.courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST request to add a course to the user
export const addCourse = async (req, res) => {
    const { email } = req.params;
    const { imageUrl, name, description } = req.body;
    try {
        const user = await User.findOne({ email });
        user.courses.push({ imageUrl, name, description });
        await user.save();
        res.status(200).json(user.courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}