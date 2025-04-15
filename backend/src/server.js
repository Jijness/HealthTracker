import express, { json } from 'express';
import bodyParser from 'body-parser'
import { connect } from 'mongoose';
import { port, hostname } from './config/env.js';
import HttpError from './models/http_error.js';


import placeRouter from './routes/places_routes.js';
import userRouter from './routes/user_routes.js';
import authRouter from './routes/auth_routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);



// Middleware
app.use(bodyParser.json());

// MongoDB Connect
// connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// Test route
app.use('/api/places', placeRouter);

app.use((req, res,next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknow error"})
})
// Start server
app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;