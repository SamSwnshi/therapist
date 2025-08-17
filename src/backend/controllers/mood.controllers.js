import { Mood } from "../models/Mood.models.js";
import logger from '../utils/logger.js'
const { sendMoodUpdateEvent } = require("../utils/inngestEvents");

// Create a new mood entry
const createMood = async (req, res, next) => {
    try {
        const { score, note, context, activities } = req.body;
        const userId = req.user ? req.user._id : null; // From auth middleware

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const mood = new Mood({
            userId,
            score,
            note,
            context,
            activities,
            timestamp: new Date(),
        });

        await mood.save();

        logger.info(`Mood entry created for user ${userId}`);

        // Send mood update event
        await sendMoodUpdateEvent({
            userId,
            mood: score,
            note,
            context,
            activities,
            timestamp: mood.timestamp,
        });

        res.status(201).json({
            success: true,
            data: mood,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createMood };
