import { validationResult } from 'express-validator';
import HttpError from '../models/http_error.js';
import userService from '../services/userService.js';

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        next((err));
    }
}
const getUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs,', 422));
    }
    try {
        const userId = req.user.userId;
        const user = await userService.getUserInfor(userId);
        res.status(200).json({ user });
    } catch (err) {
        next((err));
    }
}

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { username, email, password } = req.body;

    try {
        const newUser = await userService.registerUser({ email, password, username });
        res.status(201).json({ user: newUser });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return next(new HttpError('Could not identify user, credentials seem to be wrong.', 401));
        return next(new HttpError('Invalid credentials', 401));
    }
    const { email, password } = req.body;

    try {
        const result = await userService.loginUser(email, password);
        res.status(200).json({
            username: result.username,
            message: "Logged in",
            token: result.token,
            isFirstLogin: result.isFirstLogin
        });
    } catch (err) {
        next(err);
    }
};

const updateInfor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs,', 422));
    }
    const { full_name, gender, birth_year, activity_level } = req.body;
    const userId = req.user.userId; // gan tu checkAuth
    try {
        const updated = await userService.updateInfor(userId, {
            full_name,
            gender,
            birth_year: parseInt(birth_year),
            activity_level
        });
        res.status(200).json({ user: updated });
    } catch (err) {
        next(err);
    }
}

const changePassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your data.', 422));
    }
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    try {
        const result = await userService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const result = await userService.deleteUser(userId);
        if (!result) {
            return next(new HttpError('User not found.', 404));
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        next(err);
    }
};

export default {
    getUsers,
    getUser,
    register,
    login,
    updateInfor,
    changePassword,
    deleteUser
};
