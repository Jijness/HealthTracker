import mongoose from "mongoose";
import DailyStat from "../models/DailyStat.js";

const getAllDailyStatByUser = async (userId, begin, end) => {
    const filter = { user: new mongoose.Types.ObjectId(userId) };
    filter.date = { $gte: begin, $lte: end };
    return await DailyStat
        .find(filter)
        .sort({ date: -1 });
};
const getTodayDailyStatByUser = async (userId) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await DailyStat.findOne({
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfToday, $lte: endOfToday },
    });
};

const upsertTodayStat = async (userId) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return await DailyStat.findOneAndUpdate(
        { user: new mongoose.Types.ObjectId(userId), date: startOfToday },
        { $setOnInsert: { user: userId, date: startOfToday, steps: 0 } },
        { upsert: true, new: true }
    );
}

const updateSleepStat = async (statId, { sleepTime, wakeTime }) => {
    return await DailyStat.findByIdAndUpdate(
        statId,
        { $set: { sleepTime, wakeTime } },
        { new: true }
    );
};

const updateStepStat = async (statId, { steps }) => {
    return await DailyStat.findByIdAndUpdate(
        statId,
        { $set: { steps } },
        { new: true }
    );
};

export default {
    getAllDailyStatByUser,
    getTodayDailyStatByUser,
    upsertTodayStat,
    updateSleepStat,
    updateStepStat
};