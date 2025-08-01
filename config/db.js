const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI is not defined in .env");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGO_URI from env:", process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error Connecting to Db: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
