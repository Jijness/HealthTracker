const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    unique: true
    },
    password: {
        type: String,
        required: true
    },
    height: Number,
    weight: Number,
    age: Number,
    gender: String,
    activityLevel: String // vd "low", "moderate", "high"
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);