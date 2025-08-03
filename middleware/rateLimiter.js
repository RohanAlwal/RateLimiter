const { default: mongoose } = require("mongoose");
const RateLimit = require("../models/rateLimit.model");
const rateLimitConfig = require("../config/rateLimitConfig");

const rateLimiter = async (req, res, next) => {
    try {
        const identifier = `${req.ip} : ${req.path}`;
        const now = Date.now();

        const config = rateLimitConfig[req.path] || rateLimitConfig.default;
        const WINDOW_SIZE = config.windowMs;
        const MAX_REQUESTS = config.maxRequests;

        let result = await RateLimit.findById(identifier);

        if (!result) {
            result = await RateLimit.create({
                 _id: identifier, timestamps: [now], 
                 expireAt: new Date(now + WINDOW_SIZE) 
                });
            return next();
        }

        const validTimestamps = result.timestamps.filter(ts => now - ts <= WINDOW_SIZE);
        console.log(validTimestamps);

        if (validTimestamps.length >= MAX_REQUESTS) {
            return res.status(429).json({ error: "Too many requests" });
        }

        validTimestamps.push(now);

        result.timestamps = validTimestamps;
        result.expireAt = new Date(now + WINDOW_SIZE);
        await result.save();

        next();

    }
    catch (err) {
        console.error("Rate limiter error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = rateLimiter;