import { validationResult } from "express-validator";
import HttpError from "../models/http_error";
import healthSnapService from "../services/healthSnapService";

const getHealthSnaps = async (req, res, next) => {
    try {
        const userId = req.params.userid;
        const snaps = await healthSnapService.getAllHealthSnapByUser(userId);
        res.status(200).json({ snaps });
    } catch (err) {
        next(err);
    }
};

const createHealthSnap = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed, please check your data.', 422));
    }
    const { user, weight, height, bodyFat, muscleMass, note } = req.body;
    try {
        const newSnap = await healthSnapService.createHealthSnap({ user, weight, height, bodyFat, muscleMass, note });
        res.status(201).json({ snap: newSnap });
    } catch (err) {
        next(err);
    }
};

const getHealthSnap = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const snaps = await healthSnapService.getHealthSnapById(userId);
        if (!snaps) {
            return next(new HttpError('Healthsnap not found', 404));
        }
        res.status(200).json({ snaps });
    } catch (err) {
        next(err);
    }
};

const updateHealthSnap = async (req, res, next) => {
    const userId = req.params.useId;
    try {
        const updateSnap = await healthSnapService.updateHealthSnap(userId, req.body);
        if (!updateSnap) {
            return next(new HttpError('Healthsnap not found', 404));
        }
        res.status(200).json({ snap: updateSnap });
    } catch (err) {
        next(err);
    }
};

const deleteHealthSnap = async (req, res, next) => {
    const snapId = req.params.snapId;
    try {
        const deleteSnap = await healthSnapService.deleteHealthSnap(snapId);
        if (!deleteSnap) {
            return next(new HttpError('HealthSnap not found', 404));
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