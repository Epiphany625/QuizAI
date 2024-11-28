// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import courseSchema from './Course.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizRequested: {
        type: Number,
        default: 0,
    },
    chatbotRequested: {
        type: Number,
        default: 0,
    },
    summaryRequested: {
        type: Number,
        default: 0,
    },
    courses: {
        type: [courseSchema],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
