const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
    _id: String,
    windowStart: Date,
    count: Number,
});

module.exports = mongoose.model("RateLimit", rateLimitSchema);