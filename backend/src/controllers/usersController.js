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
        const token = await userService.loginUser(email, password);
        res.status(200).json({ message: "Logged in", token });

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
    register,
    login,
    deleteUser
};
