import User from '../models/User.js';

export const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addSummaryRequested = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        user.summaryRequested += 1;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}