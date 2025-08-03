module.exports = {
  "/api/login": { windowMs: 60 * 1000, maxRequests: 5 },
  "/api/data":  { windowMs: 60 * 1000, maxRequests: 100 },
  "default":    { windowMs: 60 * 1000, maxRequests: 10 }
};
