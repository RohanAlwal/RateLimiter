const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db.js");
require("dotenv").config({ path: "../.env" });
jest.setTimeout(20000);


beforeAll(async () => {
    console.log("MONGO_URI from env:", process.env.MONGO_URI);

  await connectDB();  // ensures DB connected before test
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("should allow requests within limit", async () => {
  for (let i = 0; i < 10; i++) {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  }
}, 60000);

test("should block requests after limit", async () => {
  for (let i = 0; i < 11; i++) {
    await request(app).get("/");
  }
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(429);
}, 60000);
