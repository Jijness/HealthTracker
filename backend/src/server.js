import express, { json } from 'express';
import { connect } from 'mongoose';
import { port, hostname } from './config/env.js';
import HttpError from './models/http_error.js';


import placeRoutes from './routes/places_routes.js';
import userRoutes from './routes/user_routes.js';
import authRoutes from './routes/auth_routes.js';

const app = express();
// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);


// MongoDB Connect
// connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));



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