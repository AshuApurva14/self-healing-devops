const axios = require("axios");
const { exec } = require("child_process");

const URL = "http://localhost:5000/health";

setInterval(async () => {
  try {
    const res = await axios.get(URL);

    if (res.status !== 200) {
      console.log("⚠️ Issue detected! Restarting container...");
      exec("docker restart my-app");
    } else {
      console.log("✅ System Healthy");
    }
  } catch (error) {
    console.log("❌ App Down! Restarting...");
    exec("docker restart my-app");
  }
}, 5000);