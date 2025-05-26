import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true,
    },
    username: {
        type: String, unique: true, sparse: true,
    },
    password: {
        type: String, required: true
    },
    full_name: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    birth_year: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
    },
    activity_level: {
        type: String,
        enum: ["sedentary", "light", "moderate", "active", "very_active"]
    },
    is_verified: {
        type: Boolean, default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"], default: "user",
    },
}, {
    timestamps: true
});
export default mongoose.model('User', userSchema);