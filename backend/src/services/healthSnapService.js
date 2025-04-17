import HealthSnap from "../models/HealthSnap";
import HttpError from "../models/http_error";

const getAllHealthSnapByUser = async (userId) => {
    return await HealthSnap.find({ user: userId }).sort({ Date: -1 });
};

const createHealthSnap = async ({ user, weight, height, bodyFat, muscleMass, note }) => {
    const newSnap = new HealthSnap({ user, weight, height, bodyFat, muscleMass, note });
    await newSnap.save();
    return newSnap;
};

const getHealthSnapById = async (snapId) => {
    return await HealthSnap.find(snapId);
};

const updateHealthSnap = async (snapId, data) => {
    return await HealthSnap.findByIdAndUpdate(snapId, data, { new: true });
};

const deleteHealthSnap = async (snapId) => {
    return await HealthSnap.findByIdAndDelete(snapId);
};

export default {
    getAllHealthSnapByUser,
    createHealthSnap,
    getHealthSnapById,
    updateHealthSnap,
    deleteHealthSnap
};