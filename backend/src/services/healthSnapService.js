import HealthSnap from "../models/HealthSnap.js";
import mongoose from "mongoose";

const getAllHealthSnapByUser = async (userId) => {
    const snaps = await HealthSnap
        .find({ user: new mongoose.Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .limit(7);
    return snaps.reverse();
};
// lay ban ghi healthSnap moi nhat cua user
const getLatestHealthSnapByUser = async (userId) => {
    return await HealthSnap
        .findOne({ user: new mongoose.Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .limit(1);
};


const createHealthSnap = async ({ user, weight, height, bodyFat, muscleMass, note }) => {
    const newSnap = new HealthSnap({
        user,
        weight,
        height,
        bodyFat,
        muscleMass,
        note
    });
    await newSnap.save();
    return newSnap;
};

const getHealthSnapById = async (snapId) => {
    return await HealthSnap.findById(snapId);
};

const updateHealthSnap = async (snapId, data) => {
    return await HealthSnap.findByIdAndUpdate(snapId, data, { new: true });
};

const deleteHealthSnap = async (snapId) => {
    return await HealthSnap.findByIdAndDelete(snapId);
};

export default {
    getAllHealthSnapByUser,
    getLatestHealthSnapByUser,
    createHealthSnap,
    getHealthSnapById,
    updateHealthSnap,
    deleteHealthSnap
};