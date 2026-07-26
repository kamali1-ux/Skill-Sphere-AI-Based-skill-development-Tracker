import os
import joblib
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "models", "skill_readiness_model.joblib")

CAREER_RULES = [
    ("AI Engineer", {"Data Science", "Python", "Machine Learning", "AI"}),
    ("Full Stack Developer", {"Java", "JavaScript", "Spring Boot", "React", "HTML", "CSS"}),
    ("Data Analyst", {"Excel", "SQL", "Python", "Data Science", "Analytics"}),
    ("UI/UX Designer", {"Design", "Figma", "UX", "Communication"}),
    ("Cybersecurity Analyst", {"Networking", "Security", "Linux", "Cybersecurity"}),
    ("Java Developer", {"Java", "Spring Boot", "SQL"}),
]

SKILL_SUGGESTIONS = {
    "AI Engineer": ["Python", "Machine Learning", "Deep Learning", "MLOps"],
    "Full Stack Developer": ["Spring Boot", "REST APIs", "JavaScript", "Cloud Deployment"],
    "Data Analyst": ["SQL", "Excel", "Power BI", "Statistics"],
    "UI/UX Designer": ["Figma", "User Research", "Wireframing", "Design Systems"],
    "Cybersecurity Analyst": ["Linux", "Networking", "OWASP", "Security Monitoring"],
    "Java Developer": ["Core Java", "Spring Boot", "MySQL", "Microservices"],
}

app = Flask(__name__)
CORS(app)


def load_model():
    if not os.path.exists(MODEL_PATH):
        from train_model import train
        train()
    return joblib.load(MODEL_PATH)


model = load_model()


def choose_career(payload, score):
    proficiency = float(payload.get("proficiencyScore", payload.get("proficiency_score", 0)))
    projects = int(payload.get("projectsCompleted", payload.get("projects_completed", 0)))
    certs = int(payload.get("certifications", 0))
    hours = float(payload.get("learningHours", payload.get("learning_hours", 0)))

    if score >= 82 and projects >= 4:
        return "Full Stack Developer"
    if proficiency >= 75 and hours >= 120 and certs >= 2:
        return "AI Engineer"
    if hours >= 80 and certs >= 1:
        return "Data Analyst"
    if projects >= 2 and proficiency >= 55:
        return "Java Developer"
    if score < 45:
        return "UI/UX Designer"
    return "Cybersecurity Analyst"


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "skillsphere-ai"})


@app.post("/predict")
def predict():
    payload = request.get_json(force=True)
    features = np.array([[
        payload.get("skillCount", payload.get("skill_count", 0)),
        payload.get("learningHours", payload.get("learning_hours", 0)),
        payload.get("certifications", 0),
        payload.get("projectsCompleted", payload.get("projects_completed", 0)),
        payload.get("proficiencyScore", payload.get("proficiency_score", 0)),
    ]])

    readiness = float(np.clip(model.predict(features)[0], 0, 100))
    career = choose_career(payload, readiness)
    growth = float(np.clip(readiness + 8 + (features[0][1] / 100), 0, 100))

    return jsonify({
        "readinessScore": round(readiness, 2),
        "skillGrowthPrediction": round(growth, 2),
        "careerSuggestion": career,
        "recommendedSkills": SKILL_SUGGESTIONS[career],
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
