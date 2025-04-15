import { Router } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import User from '../models/User.js';

const authRoutes = Router();
// register
// authRouter.post('/register', async (req, res) => {
//   const { username, password, height, weight, activityLevel } = req.body;

//   try {
//     const existing = await findOne({ username });
//     if (existing) return res.status(400).json({ message: 'Username already exists' });

//     const salt = await genSalt(10);
//     const hashedPassword = await hash(password, salt);

//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       height,
//       weight,
//       activityLevel,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
authRoutes.post('/register', async (req, res) => res.send({ title: 'Register' }));

// Login
// authRouter.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await findOne({ username });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

//     res.json({ token, user: { id: user._id, username: user.username } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
authRoutes.post('/login', async (req, res) => res.send({ title: 'Login' }));

// Logout
authRoutes.post('/logout', async (req, res) => res.send({ title: 'Logout' }));

export default authRoutes;
