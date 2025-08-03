const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
    _id: String,
    timestamps: { type: [Number], default: [] },
    expireAt: {type: Date}
});

rateLimitSchema.index({expireAt:1}, {expireAfterSeconds:0});

module.exports = mongoose.model("RateLimit", rateLimitSchema);