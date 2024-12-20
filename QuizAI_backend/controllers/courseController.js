import User from '../models/User.js';

// GET request to get all the courses of a user
export const getCourses = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        res.status(200).json(user.courses);
        console.log(`retrieved courses for ${email}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST request to add a course to the user
export const addCourse = async (req, res) => {
    const { email } = req.params;
    const { imageUrl, name, description } = req.body;
    try {
        // check if course already exists
        const user = await User.findOne({ email });
        for(const course of user.courses){
            if(course.name === name){
                res.status(400).json({ message: "Course already exists" });
                return;
            }
        }
        user.courses.push({ imageUrl, name, description });
        await user.save();
        res.status(200).json(user.courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

// request to change the course name
export const changeCourseName = async (req, res) => {
    const { email } = req.params;
    const { oldName, newName } = req.body;
    try {
        const user = await User.findOne({ email });
        user.courses.forEach((course) => {
            if(course.name === oldName){
                course.name = newName;
            }
        })
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "server error" });
    }
}

// request to change the course description
export const changeCourseDescription = async (req, res) => {
    const { email } = req.params;
    const { name, description } = req.body;
    try {
        const user = await User.findOne({ email });
        user.courses.forEach((course) => {
            if(course.name === name){
                course.description = description;
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}