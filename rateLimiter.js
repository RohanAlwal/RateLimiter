const { default: mongoose } = require("mongoose");
const RateLimit = require("./models/rateLimit.model.js");

const rateLimiter = async (req, res, next) => {
    try {
        const WINDOW_SIZE = 60 * 1000;
        const MAX_REQUESTS = 10;
        const identifier = req.ip;

        const now = Date.now();
        const windowStart = new Date(Math.floor(now / WINDOW_SIZE) * WINDOW_SIZE);
        const docId = `${identifier}:${windowStart.getTime()}`;
        console.log(docId);

        const result = await RateLimit.findOneAndUpdate(
            { _id: docId },
            { $inc: { count: 1 } },
            { upsert: true, new: true },
        );

        if (result.count > MAX_REQUESTS) {
            return res.status(429).json({ error: "Too many Requests!! " });
        }

        next();
    }
    catch (err) {
        console.error("Rate limiter error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = rateLimiter;