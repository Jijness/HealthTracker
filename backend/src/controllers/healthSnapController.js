import { validationResult } from "express-validator";
import HttpError from "../models/http_error.js";
import healthSnapService from "../services/healthSnapService.js";

const getHealthSnaps = async (req, res, next) => {
    const userId = req.user.userId;

    let snaps;
    try {
        snaps = await healthSnapService.getAllHealthSnapByUser(userId);
        if (!snaps || snaps.length === 0) {
            return next(new HttpError('Could not find healthSnaps for the provided user id.', 404));
        }
        res.status(200).json({ snaps });
    } catch (err) {
        const error = new HttpError('Fetching healthSnap failed, try again later.', 500);
        return next(error);
    }
};

const createHealthSnap = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed, please check your data.', 422));
    }
    const userId = req.user.userId;
    const { weight, height, bodyFat, muscleMass, note } = req.body;
    try {
        const newSnap = await healthSnapService.createHealthSnap({
            user: userId, weight, height, bodyFat, muscleMass, note
        });
        res.status(201).json({ snap: newSnap });
    } catch (err) {
        next(err);
    }
};

const getHealthSnap = async (req, res, next) => {
    const snapId = req.params.snapId;
    const userId = req.user.userId;
    try {
        const snap = await healthSnapService.getHealthSnapById(snapId);
        if (!snap) {
            return next(new HttpError('Healthsnap not found', 404));
        }
        if (snap.user.toString() !== userId) {
            return next(new HttpError("Unauthorized access to this health snap.", 403));
        }
        res.status(200).json({ snap });
    } catch (err) {
        next(err);
    }
};

const updateHealthSnap = async (req, res, next) => {
    const snapId = req.params.snapId;
    const userId = req.user.userId;
    try {
        const updateSnap = await healthSnapService.updateHealthSnap(snapId, req.body);
        if (!updateSnap) {
            return next(new HttpError('Healthsnap not found', 404));
        }
        if (updateSnap.user.toString() !== userId) {
            return next(new HttpError("Unauthorized access to this health snap.", 403));
        }
        res.status(200).json({ snap: updateSnap });
    } catch (err) {
        next(err);
    }
};

const deleteHealthSnap = async (req, res, next) => {
    const snapId = req.params.snapId;
    const userId = req.user.userId;
    try {
        const deleteSnap = await healthSnapService.deleteHealthSnap(snapId);
        if (!deleteSnap) {
            return next(new HttpError('HealthSnap not found', 404));
        }
        if (deleteSnap.user.toString() !== userId) {
            return next(new HttpError("Unauthorized access to this health snap.", 403));
        }
        res.status(200).json({ message: 'HealthSnap deleted successfully' })
    } catch (err) {
        next(err);
    }
};

export default {
    getHealthSnaps,
    createHealthSnap,
    getHealthSnap,
    updateHealthSnap,
    deleteHealthSnap
};