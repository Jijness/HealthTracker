import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully!')
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // dừng app nếu connect fail
    }
}
export default connectDB;