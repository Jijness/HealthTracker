import User from '../models/User.js';
import HealthSnap from '../models/HealthSnap.js';
import HttpError from '../models/http_error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getAllUsers = async () => {
    // return await User.find(); // co tra ve password
    return await User.find({}, '-password'); // ko tra ve password
}
const getUserInfor = async (userId) => {
    const user = await User.findById(userId, '-password');
    if (!user) {
        throw new HttpError('Could not find user', 404);
    }
    return user;
}

const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new HttpError("Email already in use", 422);

    const hashedPw = await bcrypt.hash(password, 12);

    const newUser = new User({
        email,
        password: hashedPw,
        username
    });

    await newUser.save();
    return { id: newUser.id, username: newUser.username, email: newUser.email };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new HttpError("User not found", 404);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new HttpError("Invalid credentials", 401);
    console.log('Login success!');

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    const isFirstLogin = !user.gender || !user.birth_year || !user.activity_level;

    return {
        username: user.username,
        token,
        isFirstLogin
    };
};

const updateInfor = async (userId, data) => {
    const updated = await User.findByIdAndUpdate(
        userId,
        { ...data },
        { new: true, runValidators: true }
    );
    if (!updated) {
        throw new HttpError('User not found', 404);
    }
    return {
        id: updated.id,
        email: updated.email,
        username: updated.username,
        full_name: updated.full_name,
        gender: updated.gender,
        birth_year: updated.birth_year,
        activity_level: updated.activity_level,
        role: updated.role
    }
};

const deleteUser = async (userId) => {
    // Xoa healthsnap truoc
    await HealthSnap.deleteMany({ user: userId });
    // Roi moi xoa user
    return await User.findByIdAndDelete(userId);
};

export default {
    getAllUsers,
    getUserInfor,
    registerUser,
    loginUser,
    updateInfor,
    deleteUser
};
