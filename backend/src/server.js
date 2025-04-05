import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';

config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json());

// MongoDB Connect
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
