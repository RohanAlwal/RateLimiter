const { default: mongoose } = require("mongoose");
const RateLimit = require("../models/rateLimit.model");

const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 10; 

const rateLimiter = async (req, res, next) => {
    try {
        const identifier = req.ip;
        const now = Date.now();

        let result = await RateLimit.findById(identifier);

        if (!result) {
            result = await RateLimit.create({ _id: identifier, timestamps: [now] });
            return next();
        }

        const validTimestamps = result.timestamps.filter(ts => now - ts <= WINDOW_SIZE);
        console.log(validTimestamps);

        if (validTimestamps.length >= MAX_REQUESTS) {
            return res.status(429).json({ error: "Too many requests" });
        }

        validTimestamps.push(now);

        result.timestamps = validTimestamps;
        await result.save();

        next();

    }
    catch (err) {
        console.error("Rate limiter error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = rateLimiter;