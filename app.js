const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("DevOps App Running 🚀");
});

app.get("/health", (req, res) => {
  // simulate random failure
  const random = Math.floor(Math.random() * 5);

  if (random === 2) {
    return res.status(500).send("ERROR ❌");
  }

  res.send("OK ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
