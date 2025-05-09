import mongoose from "mongoose";

const dailyStatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    date: {
        type: Date, require: true
    },
    steps: {
        type: Number, default: 0, min: 0
    },
    sleepTime: {
        type: Date
    },
    wakeTime: {
        type: Date
    }
}, { timestamps: true });
dailyStatSchema.index({ user: 1, date: 1 }, { unique: true });
export default mongoose.model('dailyStat', dailyStatSchema);