import { Router } from 'express';
import userController from '../controllers/usersController.js';
import { check } from 'express-validator';
import { checkAuth } from '../middleware/checkAuth.js';

const userRoutes = Router();

userRoutes.get('/', userController.getUsers);


userRoutes.post('/register',
    [
        check('username').notEmpty(),
        check('email')
            .normalizeEmail() // Test@gmail.com => test@gmail.com
            .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.register
);

userRoutes.post('/login',
    [
        check('email')
            .normalizeEmail()
            .isEmail()
    ],
    userController.login);


userRoutes.patch('/updateInfor', checkAuth,
    [
        check('gender').isIn(['male', 'female']),
        check('birth_year').isInt({ min: 1900, max: new Date().getFullYear() })
        // check('activityLevel').isIn(['sedentary','light','moderate','active','very_active'])
    ],
    userController.updateInfor
);

userRoutes.delete('/:uid', userController.deleteUser);

export default userRoutes;