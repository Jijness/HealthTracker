import express, { json } from 'express';
import { connect } from 'mongoose';
import { port, hostname } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);



// Middleware
app.use(json());

// MongoDB Connect
// connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
    res.send('App is running...');
});

// Start server
app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;