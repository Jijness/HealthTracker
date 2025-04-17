import express, { json } from 'express';
import { port, hostname } from './config/env.js';
import connectDB from './config/mongoose.js';
import HttpError from './models/http_error.js';

import placeRoutes from './routes/placesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/auth_routes.js';
import healthSnapRoutes from './routes/healthSnapRoutes.js';


const app = express();
await connectDB();

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/healthSnap', healthSnapRoutes);



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
app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;