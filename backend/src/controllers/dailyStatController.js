import { validationResult } from "express-validator";
import HttpError from "../models/http_error.js";
import dailyStatService from "../services/dailyStatService.js";

const getDailyStats = async (req, res, next) => {
    const userId = req.user.userId;

    const end = new Date(); // today
    const begin = new Date(end);
    begin.setMonth(end.getMonth() - 3);

    try {
        const stats = await dailyStatService.getAllDailyStatByUser(userId, begin, end);
        res.status(200).json({ stats });
    } catch (err) {
        const error = new HttpError('Fetching dailyStats failed, try again later.', 500);
        return next(error);
    }
};
const getTodayStat = async (req, res, next) => {
    const userId = req.user.userId;

    try {
        const stats = await dailyStatService.getTodayDailyStatByUser(userId);
        if (!stats) {
            return res.status(200).json({});
        }
        res.status(200).json({ stats });
    } catch (err) {
        const error = new HttpError('Fetching dailyStats failed, try again later.', 500);
        return next(error);
    }
};

const updateSleepStat = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(errors.array()[0].msg, 400));
    }
    const userId = req.user.userId;
    const { sleepTime, wakeTime } = req.body;

    let stat;
    try {
        stat = await dailyStatService.upsertTodayStat(userId);
    } catch {
        return next(new HttpError('Can not init dailyStat', 500));
    }
    const base = new Date(stat.date);
    base.setHours(0, 0, 0, 0);

    const [hS, mS] = sleepTime.split(':').map(Number);
    const [hW, mW] = wakeTime.split(':').map(Number);
    let sleep = new Date(base); sleep.setHours(hS, mS);
    let wake = new Date(base); wake.setHours(hW, mW);

    // Nếu giờ ngủ > giờ thức (22:30 -> 06:25) thì là ngủ trước 0h00
    if (sleep.getTime() > wake.getTime()) {
        sleep = new Date(sleep.getTime() - 24 * 60 * 60 * 1000);
    }

    try {
        const updated = await dailyStatService.updateSleepStat(stat._id, {
            sleepTime: sleep,
            wakeTime: wake
        });
        res.status(200).json({ stat: updated });
    } catch (err) {
        next(new HttpError('Update sleep failed', 500));
    }
};

const updateStepStat = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(errors.array()[0].msg, 400));
    }
    const userId = req.user.userId;
    const { steps } = req.body;

    let stat;
    try {
        stat = await dailyStatService.upsertTodayStat(userId);
    } catch {
        return next(new HttpError('Can not init dailyStat', 500));
    }

    if (typeof steps !== 'number' || steps < 0) {
        return next(new HttpError("steps value invalid", 400));
    }

    try {
        const updated = await dailyStatService.updateStepStat(stat._id, { steps });
        res.status(200).json({ stat: updated });
    } catch (err) {
        next(new HttpError('Update step failed', 500));
    }
};

export default {
    getDailyStats,
    getTodayStat,
    updateSleepStat,
    updateStepStat
};