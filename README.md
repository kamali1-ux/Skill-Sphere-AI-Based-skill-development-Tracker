# SkillSphere - AI-Based Skill Development Tracker

SkillSphere is a complete full-stack college project for tracking skills, learning goals, activities, analytics, and AI-based career recommendations.

## Tech Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript, Bootstrap 5, Chart.js
- Backend: Java 17, Spring Boot REST API, Spring Security, JWT, Spring Data JPA
- Database: MySQL
- AI Module: Python, Flask, Pandas, NumPy, Scikit-learn, Matplotlib, Joblib

## Project Structure

```text
SkillSphere/
├── frontend/
│   ├── html/
│   ├── css/
│   └── js/
├── backend-java/
│   └── src/main/
├── ai-module/
│   ├── data/
│   └── models/
├── database/
└── README.md
```

## Features

- User registration and login with JWT authentication
- Profile management
- Add, edit, delete, and categorize skills
- Beginner, Intermediate, Advanced, and Expert proficiency levels
- Learning goals with target dates and progress percentage
- Activity tracking for courses, certifications, practice hours, and projects
- Weekly learning plan generated from weak skills and active goals
- Search and category filters for skill management
- Chart.js dashboard with skill progress, distribution, learning hours, goal status, and readiness trend
- Python Random Forest model for readiness score, growth prediction, recommended skills, and career path suggestions

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/skills` | List user skills |
| POST | `/api/skills` | Add skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Delete skill |
| GET | `/api/goals` | List goals |
| POST | `/api/goals` | Add goal |
| PUT | `/api/goals/{id}` | Update goal |
| DELETE | `/api/goals/{id}` | Delete goal |
| GET | `/api/activities` | List learning activities |
| POST | `/api/activities` | Add learning activity |
| POST | `/api/predict` | Generate AI prediction |
| GET | `/api/predictions` | View prediction history |
| GET | `/api/profile` | View profile |
| PUT | `/api/profile` | Update profile |
| GET | `/api/learning-plan` | Generate weekly learning plan |

## Setup

### 1. MySQL

Create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

Optional demo data:

```bash
mysql -u root -p < database/sample_data.sql
```

Update `backend-java/src/main/resources/application.properties` if your MySQL username or password differs.

### 2. AI Service

```bash
cd ai-module
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python train_model.py
python app.py
```

The AI service runs at `http://localhost:5000`.

### 3. Spring Boot Backend

```bash
cd backend-java
mvn spring-boot:run
```

The REST API runs at `http://localhost:8080`.

### 4. Frontend

Open `frontend/html/index.html` in a browser, or serve the folder with a simple static server.

```bash
cd frontend
python -m http.server 3000
```

Then visit `http://localhost:3000/html/index.html`.

## Demo Account

If you load `database/sample_data.sql`, use:

- Email: `demo@skillsphere.com`
- Password: `password`

## AI Dataset Fields

- `user_id`
- `skill_count`
- `learning_hours`
- `certifications`
- `projects_completed`
- `proficiency_score`
- `readiness_score`

## Notes for Presentation

This project demonstrates full-stack development, database relationships, REST API design, JWT security, dashboard analytics, and an AI/ML integration pattern where Spring Boot calls a separate Python prediction service.
