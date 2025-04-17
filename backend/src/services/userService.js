import User from '../models/User.js';
import HttpError from '../models/http_error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getAllUsers = async () => {
    return await User.find();
    // return await User.find({}, '-password'); // ko tra ve password
}

const registerUser = async ({ email, password, username }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new HttpError("Email already in use", 422);

    // const hashedPw = await bcrypt.hash(password, 12);

    const newUser = new User({
        email,
        password, // : hashedPw,
        username
    });

    await newUser.save();
    return { id: newUser.id, email: newUser.email, username: newUser.username };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new HttpError("User not found", 404);

    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = (password === user.password);
    if (!isValid) throw new HttpError("Invalid credentials", 401);
    console.log('Login success!');
    // const token = jwt.sign(
    //     { userId: user.id, email: user.email },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '1h' }
    // );

    // return token;
};

export default {
    getAllUsers,
    registerUser,
    loginUser
};
