import { Router } from 'express';
import userController from '../controllers/users_controller.js';
import User from '../models/User.js';
import { check } from 'express-validator';

const userRoutes = Router();

userRoutes.get('/', userController.getUsers);


userRoutes.post('/register',
    [
        check('name').not().isEmpty(),
        check('email')
            .normalizeEmail() // Test@gmail.com => test@gmail.com
            .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.register
);

userRoutes.post('/login', userController.login);


// userRoutes.put('/:id', );

// userRoutes.delete('/:id', );

export default userRoutes;