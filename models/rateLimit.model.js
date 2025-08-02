const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
    _id: String,
    timestamps: { type: [Number], default: [] },
});

module.exports = mongoose.model("RateLimit", rateLimitSchema);