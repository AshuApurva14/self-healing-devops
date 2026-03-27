import requests
import time
import numpy as np
from sklearn.ensemble import IsolationForest
import os

# Collect data
data = []

URL = "http://localhost:5000/health"

print("Collecting data...")

# Step 1: Collect normal data
for _ in range(20):
    try:
        res = requests.get(URL)
        value = 1 if res.status_code == 200 else 0
        data.append([value])
    except:
        data.append([0])
    time.sleep(1)

# Train model
model = IsolationForest(contamination=0.2)
model.fit(data)

print("Model trained. Monitoring started...")

# Step 2: Monitor continuously
last_restart_time = 0

while True:
    try:
        res = requests.get(URL)
        value = 1 if res.status_code == 200 else 0
    except:
        value = 0

    prediction = model.predict([[value]])

    current_time = time.time()

    if prediction[0] == -1 and (current_time - last_restart_time > 15):
        print("🚨 Anomaly detected! Restarting container...")
        os.system("docker restart my-app")
        last_restart_time = current_time
    else:
        print("✅ System normal")

    time.sleep(5)