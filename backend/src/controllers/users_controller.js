import HttpError from '../models/http_error.js';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Zucuber',
        email: 'test@test.com',
        password: 'testers'
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
}

const register = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const { name, email, password } = req.body;
    
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists', 422);
    }
    const createUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createUser);
    res.status(201).json({user: createUser});
}

const login = (req, res, next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }
    res.json({message: 'Logged in!'});
}

const userController = {
    getUsers,
    register,
    login
}
export default userController;