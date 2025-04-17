import mongoose from 'mongoose';

const healthSnapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    Date: {
        type: Date, default: Date.now
    },
    weight: {
        type: Number, required: true
    },
    height: {
        type: Number, required: true
    },
    bodyFat: { type: Number },
    muscleMass: { type: Number },
    note: { type: String }
}, {
    timestamps: true
});
export default mongoose.model('HealthSnap', healthSnapSchema);