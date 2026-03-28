# AI-Driven Self-Healing DevOps Pipeline

> A zero-cost, end-to-end self-healing DevOps pipeline integrating Docker, Prometheus, Grafana, Jenkins, and AI-based anomaly detection.

## 🚀 Overview

This project demonstrates a production-ready DevOps workflow with built-in self-healing. The stack includes:

- Node.js app exposing `/health` and `/metrics`
- Prometheus for metrics scraping
- Grafana for dashboards + alerting visuals
- Jenkins for CI/CD pipeline (declarative pipeline integration)
- Monitoring agent (`monitor.js`) for rule-based recovery
- ML anomaly detection (`ai-monitor.py`) using `IsolationForest`
- Container orchestration with Docker, restart on failures

## 🔥 Why this is special

- Handles intermittent failures via randomized `500` responses in app health
- Detects anomalies using machine learning, not only static thresholds
- Automatically restarts containers when issues appear
- Designed for extendibility to Kubernetes/ELK/Slack/Email alerts

## 📁 Project files

- `app.js` — Node.js service with metrics and random intermittent failures
- `monitor.js` — Polls `http://localhost:5000/health`, restarts `my-app` on failure
- `ai-monitor.py` — trains IsolationForest, monitors health, does self-healing restart
- `prometheus.yml` — scrape config for the `app.js` metrics endpoint
- `Dockerfile` — builds `my-app` container

## 🛠️ Setup (local test)

1. Clone repo:

```bash
git clone https://github.com/rishu-1112/self-healing-devops.git
cd self-healing-devops
```

2. Build and run Docker app:

```bash
docker build -t my-app .
docker run -d --name my-app -p 5000:5000 my-app
```

3. Start Node.js app locally (alternatively from container):

```bash
npm install
node app.js
```

4. Start Prometheus:

```bash
docker run -d --name prom -p 9090:9090 -v "$PWD/prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
```

5. Add a Grafana container:

```bash
docker run -d --name grafana -p 3000:3000 grafana/grafana
```

6. Run self-healing monitoring:

- Rule-based: `node monitor.js`
- AI-based: `python3 ai-monitor.py`

## 📈 Metrics & dashboards

- Prometheus scrapes `http://host.docker.internal:5000/metrics` or `http://localhost:5000/metrics`
- Grafana dashboard configuration in this repo is project-driven (manual UI setup)

### Screenshots

![Prometheus metrics](screenshots/prometheus-dashboard.png)
![Grafana self-healing dashboard](screenshots/grafana-self-healing-dash.png)
![Jenkins build status](screenshots/jenkins-success-build-status.png)
![Local metrics endpoint](screenshots/localhost-metrics.png)
![Docker Desktop status](screenshots/docker-desktop.png)
![VS Code view](screenshots/vs-code.png)

## 🧠 AI & anomaly detection

`ai-monitor.py` behavior:

- Collect 20 samples from `/health` to train baseline
- Each sample encoded as 1 (OK) or 0 (FAIL)
- Trains `IsolationForest(contamination=0.2)` and predicts online
- Restart container `my-app` when anomaly is detected > 15s apart

## 🧩 Future enhancements

- Kubernetes auto-scaling (HPA/Cluster Autoscaler)
- ELK stack (Logstash/Elasticsearch/Kibana) for log-driven anomalies
- Email/Slack alerts with Prometheus Alertmanager
- Advanced models: LSTM, ARIMA, hybrid rule-ML
- Dynamic deployment pipeline with Jenkinsfiles and GitHub Actions

## 📝 Jenkins CI/CD example (concept)

Pipeline includes:

- Build Docker image
- Push to registry
- Deploy to environment (dev/staging/prod)
- Run health checks and rollback on fail
- Trigger `monitor.js` or `ai-monitor.py` as optional recovery stage

## ✅ Quick demo commands

```bash
# Run poller
node monitor.js

# Run ML self-healing
python3 ai-monitor.py

# Manual health check
curl -i http://localhost:5000/health

# Metrics check
curl -i http://localhost:5000/metrics
```

## 📦 Requirements

- Node.js 18+
- Python 3.9+
- scikit-learn
- Docker
- (Optional) Jenkins + Prometheus + Grafana

Install Python deps:

```bash
pip install requests numpy scikit-learn
```

## 💬 Community Feedback

This project is in active progress. Feedback on production hardening, observability best-practices, security (RBAC/network policies), and CI/CD branching strategies is highly welcome.

---

---

## 👩‍💻 Author

**Risu Kumari**  
B.Tech CSE (2023–2027) | Sarala Birla University  

🔗 GitHub: https://github.com/rishu-1112  

---

## 🌟 About the Author

I am passionate about building real-world systems that combine **DevOps, Cloud, and Artificial Intelligence**.  

This project is part of my journey to explore:
- Scalable system design  
- Intelligent automation  
- Self-healing infrastructure  

I believe in **learning by building**, and this project is just the beginning 🚀  

---

## 🤝 Let's Connect

If you are working on similar domains (DevOps / AI / Cloud), feel free to connect and collaborate!  

💬 Open to discussions, feedback, and opportunities.