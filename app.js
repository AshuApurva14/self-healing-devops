import express from "express";
import client from "prom-client";

const app = express();

// Create a Registry
const register = new client.Registry();

// Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Custom counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of requests",
});

register.registerMetric(httpRequestCounter);

app.get("/", (req, res) => {
  httpRequestCounter.inc();
  res.send("DevOps App Running 🚀");
});

app.get("/health", (req, res) => {
  httpRequestCounter.inc();

  const random = Math.floor(Math.random() * 5);

  if (random === 2) {
    return res.status(500).send("ERROR ❌");
  }

  res.send("OK ✅");
});

// 🔥 IMPORTANT: Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});