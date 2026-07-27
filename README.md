<div align="center">

# 🎯 SkillSphere
### AI-Based Skill Development Tracker

**Track your skills. Analyze your growth. Get AI-powered career guidance.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Java](https://img.shields.io/badge/Java-17%2B-orange?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey?logo=flask)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-ff6384?logo=chartdotjs)](https://www.chartjs.org/)

[Live Demo (mock)](#-running-with-the-mock-api-no-java-required) · [Features](#-features) · [Setup](#-installation--setup) · [API Docs](#-rest-api-reference) · [Contributing](./CONTRIBUTING.md)

</div>

---

## 📌 Overview

**SkillSphere** is a full-stack college project that serves as a centralized platform for students and professionals to:

- **Track** technical and soft skills with proficiency levels
- **Set and monitor** learning goals with deadlines
- **Log** courses, certifications, practice hours, and projects
- **Visualize** growth through interactive Chart.js dashboards
- **Receive** AI-generated readiness scores, career path suggestions, and recommended next skills — powered by a Python Random Forest model

The architecture demonstrates a real-world **microservice pattern**: a Java Spring Boot REST API as the core backend, a separate Python Flask prediction service as an AI sidecar, and a Vanilla JS frontend that consumes both.

---

## ✨ Features

| Module | Capabilities |
|---|---|
| 🔐 **Authentication** | JWT-based register/login, BCrypt password hashing, stateless sessions |
| 🧠 **Skill Management** | Add, edit, delete, categorize skills; Beginner → Expert proficiency levels |
| 🎯 **Goal Tracking** | Goals with target dates, progress %, and auto-completion detection |
| 📚 **Activity Log** | Log courses, certifications, practice sessions, and projects |
| 📊 **Analytics Dashboard** | 5 Chart.js charts: skill distribution, progress, hours log, goal status, readiness trend |
| 🤖 **AI Predictions** | Random Forest model predicts readiness score, growth forecast, career path, and next skills |
| 🗓️ **Learning Plan** | Auto-generated weekly plan based on your weakest skill and open goal |
| 🎮 **Practice Hub** | Interactive MCQ practice lessons organized by skill and difficulty |
| 🌙 **Theme & Settings** | Dark/light mode, accent colour picker, achievements/badge system |
| 👤 **Profile** | View and update personal details and career interests |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│          Browser / Frontend         │
│  HTML5 · CSS3 · Vanilla JS · Bootstrap 5 · Chart.js  │
└───────────────────┬─────────────────┘
                    │ HTTP (REST / JSON)
                    ▼
┌─────────────────────────────────────┐
│     Java Spring Boot REST API        │
│  Port 8080 · JWT Security · JPA/MySQL│
└─────┬───────────────────────────────┘
      │  HTTP POST /predict
      ▼
┌─────────────────────────────────────┐
│   Python Flask AI Microservice      │
│  Port 5000 · Random Forest · joblib │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│         MySQL Database              │
│  skillsphere_db · 6 tables          │
└─────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript, Bootstrap 5.3, Chart.js |
| **Backend** | Java 17+, Spring Boot 3.3.5, Spring Security, Spring Data JPA |
| **Authentication** | JWT (jjwt 0.12.6), BCrypt |
| **AI / ML** | Python 3.10+, Flask 3.0, Scikit-learn (Random Forest), Pandas, NumPy, Joblib |
| **Database** | MySQL 8.0 |
| **Build** | Maven 3.x |

---

## 📁 Project Structure

```
SkillSphere/
├── frontend/
│   ├── html/          # 12 HTML pages (index, login, register, dashboard, skills, goals, …)
│   ├── css/
│   │   └── styles.css # Design system (light/dark theme, CSS variables)
│   ├── js/
│   │   ├── api.js     # Shared API client, auth helpers, shell renderer
│   │   ├── dashboard.js
│   │   ├── skills.js
│   │   ├── goals.js
│   │   ├── activities.js
│   │   ├── learning-plan.js
│   │   ├── recommendations.js
│   │   ├── practice.js
│   │   ├── profile.js
│   │   └── settings.js
│   └── lessons/       # JSON MCQ lesson files (10 skills × 3 difficulty × 700 questions)
│
├── backend-java/
│   ├── pom.xml
│   └── src/main/java/com/skillsphere/
│       ├── config/         # SecurityConfig (CORS, JWT filter chain)
│       ├── controller/     # AuthController, SkillController, GoalController,
│       │                   # ActivityController, PredictionController,
│       │                   # LearningPlanController, ProfileController
│       ├── dto/            # AuthRequest/Response, RegisterRequest,
│       │                   # PredictionRequest/Response, LearningPlanItem
│       ├── model/          # User, Skill, Goal, LearningActivity, Prediction
│       ├── repository/     # Spring Data JPA repositories
│       ├── security/       # JwtService, JwtAuthenticationFilter
│       └── service/        # AiPredictionService, CurrentUserService
│
├── ai-module/
│   ├── app.py             # Flask prediction API (/predict, /health)
│   ├── train_model.py     # Trains and saves the Random Forest model
│   ├── requirements.txt
│   └── data/
│       └── sample_skill_dataset.csv
│
├── database/
│   ├── schema.sql         # Creates all 6 tables
│   └── sample_data.sql    # Demo user + seed data
│
├── dev-mock-api.py        # Standalone mock API (no Java/MySQL needed for UI dev)
├── .env.example           # Environment variable template
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

| Tool | Version |
|---|---|
| Java (JDK) | 17 or higher |
| Maven | 3.8+ |
| Python | 3.10+ |
| MySQL | 8.0 |
| Git | Any recent |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/kamali1-ux/Skill-Sphere-AI-Based-skill-development-Tracker.git
cd Skill-Sphere-AI-Based-skill-development-Tracker
```

---

### Step 2 — Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your MySQL password and a strong JWT secret (see `.env.example` for all variables).

---

### Step 3 — Set Up the Database

```bash
# Create schema
mysql -u root -p < database/schema.sql

# (Optional) Load demo data
mysql -u root -p < database/sample_data.sql
```

---

### Step 4 — Start the AI Service

```bash
cd ai-module
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python train_model.py    # Trains and saves the model (run once)
python app.py            # Starts Flask on http://localhost:5000
```

---

### Step 5 — Start the Spring Boot Backend

```bash
cd backend-java
mvn spring-boot:run
```

The REST API is available at **`http://localhost:8080`**.

---

### Step 6 — Open the Frontend

```bash
cd frontend
python -m http.server 3000
```

Visit **`http://localhost:3000/html/index.html`** in your browser.

---

## ⚡ Running with the Mock API (No Java Required)

For fast frontend-only development, a Python mock server mimics all API endpoints in-memory:

```bash
python dev-mock-api.py
# Runs at http://localhost:8080
```

Then open `frontend/html/index.html` directly in a browser. Login with:

- **Email**: `demo@skillsphere.com`
- **Password**: `password`

> ⚠️ The mock API stores data in memory only — all data resets when the server restarts.

---

## 🔌 REST API Reference

> All protected endpoints require the `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT |

### Skills

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/skills` | List authenticated user's skills |
| `POST` | `/api/skills` | Add a new skill |
| `PUT` | `/api/skills/{id}` | Update a skill |
| `DELETE` | `/api/skills/{id}` | Delete a skill |

### Goals

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/goals` | List goals |
| `POST` | `/api/goals` | Create a goal |
| `PUT` | `/api/goals/{id}` | Update goal progress |
| `DELETE` | `/api/goals/{id}` | Delete a goal |

### Activities, Predictions & More

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/activities` | List learning activities |
| `POST` | `/api/activities` | Log a new activity |
| `POST` | `/api/predict` | Run AI prediction and save result |
| `GET` | `/api/predictions` | View prediction history |
| `GET` | `/api/learning-plan` | Get auto-generated weekly plan |
| `GET` | `/api/profile` | Get user profile |
| `PUT` | `/api/profile` | Update profile |

### AI Service (Python Flask)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health check |
| `POST` | `/predict` | Accepts skill metrics, returns readiness score & career suggestion |

---

## 📊 Database Schema

```
users               → id, name, email, password (BCrypt), role, phone, education, career_interest
skills              → id, user_id (FK), skill_name, category, proficiency_level, proficiency_score
goals               → id, user_id (FK), goal_name, target_date, progress_percentage, completed
learning_activities → id, user_id (FK), activity_type, title, hours_spent, completion_date
predictions         → id, user_id (FK), readiness_score, skill_growth_prediction, career_suggestion, recommended_skills, prediction_date
learning_plan_notes → id, user_id (FK), plan_title, plan_note, due_date, completed
```

---

## 🖼️ Screenshots

> _Add screenshots of a running local instance here._

| Landing Page | Dashboard | Skills |
|---|---|---|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

| AI Recommendations | Learning Plan | Practice Hub |
|---|---|---|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

---

## 🚀 Deployment Notes

### Production Checklist

- [ ] Set strong `JWT_SECRET` env variable (64+ random characters).
- [ ] Set `DB_PASSWORD` to a secure credential.
- [ ] Set `spring.jpa.hibernate.ddl-auto=none` and use database migrations.
- [ ] Run Flask with `debug=False` in `ai-module/app.py`.
- [ ] Restrict CORS to your actual deployed frontend URL in `SecurityConfig.java`.
- [ ] Place Spring Boot behind Nginx/Apache with HTTPS.

---

## 🔮 Future Improvements

- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] OAuth2 social login (Google)
- [ ] Role-based admin panel for instructors
- [ ] PDF/CSV report export
- [ ] Notification system for goal deadlines
- [ ] Mobile-responsive PWA with offline support
- [ ] Dockerized deployment with `docker-compose.yml`
- [ ] Unit and integration tests (JUnit 5 + Mockito, pytest)
- [ ] CI/CD pipeline with GitHub Actions

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 🔒 Security

For security vulnerabilities, please follow our [SECURITY.md](./SECURITY.md) responsible disclosure policy. **Do not open a public issue for security bugs.**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👩‍💻 Author

**Kamali M** — B.Tech Computer Science

[![GitHub](https://img.shields.io/badge/GitHub-kamali1--ux-181717?logo=github)](https://github.com/kamali1-ux)

---

<div align="center">

**⭐ If you found this project useful, please star it on GitHub!**

</div>
