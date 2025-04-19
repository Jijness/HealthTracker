import express, { json } from 'express';
import { port, hostname } from './config/env.js';
import connectDB from './config/mongoose.js';
import cors from 'cors';
import HttpError from './models/http_error.js';

import placeRoutes from './routes/placesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import healthSnapRoutes from './routes/healthSnapRoutes.js';


const app = express();
await connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',  // '*' Chấp nhận tất cả các domain
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/healthSnap', healthSnapRoutes);



app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Unknow error" })
})
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

export default app;