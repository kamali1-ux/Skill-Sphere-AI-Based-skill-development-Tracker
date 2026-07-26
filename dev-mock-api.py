from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from datetime import datetime
import urllib.parse
import random
import os

# In-memory database structured by userId
users = [{"id": 1, "name": "Demo Student", "email": "demo@skillsphere.com", "password": "password", "role": "USER"}]

user_skills = {
    1: [
        {"id": 1, "skillName": "Java", "category": "Programming", "proficiencyLevel": "Advanced", "proficiencyScore": 75},
        {"id": 2, "skillName": "SQL", "category": "Data Science", "proficiencyLevel": "Intermediate", "proficiencyScore": 50},
    ]
}

user_goals = {
    1: [{"id": 1, "goalName": "Complete Spring Boot course", "targetDate": "2026-07-20", "progressPercentage": 65, "completed": False}]
}

user_activities = {
    1: [
        {"id": 1, "activityType": "Course", "title": "Spring Boot API Development", "hoursSpent": 28, "completionDate": "2026-04-10"},
        {"id": 2, "activityType": "Project", "title": "SkillSphere prototype", "hoursSpent": 34, "completionDate": "2026-06-01"},
    ]
}

user_predictions = {
    1: []
}

learning_plan = [
    {"day": "Mon", "title": "Spring Boot REST practice", "description": "Build one small CRUD endpoint and test it with sample data.", "duration": "60 min", "completed": False},
    {"day": "Tue", "title": "SQL revision", "description": "Write joins and grouping queries using SkillSphere tables.", "duration": "45 min", "completed": False},
    {"day": "Wed", "title": "Project documentation", "description": "Update README screenshots, setup notes, and API table.", "duration": "40 min", "completed": False},
    {"day": "Thu", "title": "Dashboard analytics", "description": "Review chart data and add one new activity entry.", "duration": "30 min", "completed": False},
    {"day": "Fri", "title": "Career path review", "description": "Run AI prediction and note the recommended next skills.", "duration": "30 min", "completed": False},
]


class Handler(BaseHTTPRequestHandler):
    def _send(self, data=None, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        self.end_headers()
        if data is not None:
            self.wfile.write(json.dumps(data).encode("utf-8"))

    def _body(self):
        length = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(length) or b"{}")

    def _current_user_id(self):
        auth = self.headers.get("Authorization")
        if auth and auth.startswith("Bearer dev-token-"):
            try:
                return int(auth.split("Bearer dev-token-")[-1])
            except ValueError:
                return 1
        return 1

    def do_OPTIONS(self):
        self._send({})

    def do_GET(self):
        parts = self.path.split("?")
        path = parts[0]
        params = {}
        if len(parts) > 1:
            for pair in parts[1].split("&"):
                if "=" in pair:
                    k, v = pair.split("=", 1)
                    params[k] = urllib.parse.unquote(v)
        user_id = self._current_user_id()
        
        if path == "/api/skills":
            self._send(user_skills.get(user_id, []))
        elif path == "/api/goals":
            self._send(user_goals.get(user_id, []))
        elif path == "/api/activities":
            self._send(user_activities.get(user_id, []))
        elif path == "/api/predictions":
            self._send(user_predictions.get(user_id, []))
        elif path == "/api/learning-plan":
            self._send(generate_plan(user_id))
        elif path == "/api/profile":
            user = next((u for u in users if u["id"] == user_id), None)
            if user:
                user_copy = user.copy()
                user_copy.pop("password", None)
                self._send(user_copy)
            else:
                self._send({"error": "User not found"}, 404)
        elif path == "/api/practice/search":
            skill = params.get("skill", "Python")
            difficulty = params.get("difficulty", "Beginner")
            
            skills = ["Python", "SQL", "Java", "JavaScript", "HTML", "CSS", "React", "Node.js", "Machine Learning", "Git"]
            skill_norm = skill.lower().replace(" ", "").replace(".js", "")
            skill_idx = 0
            for idx, s in enumerate(skills):
                s_norm = s.lower().replace(" ", "").replace(".js", "")
                if s_norm in skill_norm or skill_norm in s_norm:
                    skill_idx = idx
                    break
            else:
                skill_idx = hash(skill) % len(skills)
                
            start_id = skill_idx * 2000 + (1 if difficulty == "Beginner" else 701 if difficulty == "Intermediate" else 1401)
            end_id = skill_idx * 2000 + (700 if difficulty == "Beginner" else 1400 if difficulty == "Intermediate" else 2000)
            
            # Find completed lessons
            completed = set()
            for act in user_activities.get(user_id, []):
                if act.get("activityType") == "Practice Session" and "Completed Lesson #" in act.get("title", ""):
                    try:
                        parts_act = act["title"].split("Completed Lesson #")[-1]
                        lesson_id = int(parts_act.split(" - ")[0].split(" ")[0])
                        completed.add(lesson_id)
                    except Exception:
                        pass
                        
            pool = [lid for lid in range(start_id, end_id + 1) if lid not in completed]
            if not pool:
                pool = list(range(start_id, end_id + 1))
                
            selected_id = random.choice(pool)
            
            file_path = f"frontend/lessons/lesson_{selected_id}.json"
            if os.path.exists(file_path):
                with open(file_path, "r") as f_in:
                    lesson_data = json.load(f_in)
            else:
                lesson_data = {
                    "id": selected_id,
                    "title": f"{skill} {difficulty} - Fallback Module",
                    "category": "Programming",
                    "difficulty": difficulty,
                    "question": f"What is the best practice when working with {skill} at an {difficulty} level?",
                    "options": ["Optimize execution paths", "Implement secondary caching", "Ignore constraints"],
                    "answer": "Optimize execution paths",
                    "explanation": f"When practicing {skill}, optimizing your execution paths ensures maximum performance."
                }
                
            logs = [
                f"[AI Search Agent] Initiating web search query: 'site:stackoverflow.com OR site:mdn.mozilla.org \"{skill}\" \"{difficulty}\" practice challenges'",
                f"[Web Scraper] Querying public coding repositories and official documentation portals...",
                f"[Web Scraper] Found 42 relevant matches. Synthesizing questions...",
                f"[AI Analyzer] Evaluating question #{selected_id} for complexity and correct options...",
                f"[AI Analyzer] Shuffling multiple-choice option indices to eliminate placement bias...",
                f"[AI Agent] Successfully loaded: '{lesson_data['title']}'."
            ]
            
            self._send({
                "status": "Success",
                "logs": logs,
                "question": lesson_data
            })
        else:
            self._send({"error": "Not found"}, 404)

    def do_POST(self):
        path = self.path.split("?")[0]
        body = self._body()
        user_id = self._current_user_id()

        if path == "/api/auth/login":
            user = next((u for u in users if u["email"] == body.get("email") and u["password"] == body.get("password")), None)
            if not user:
                self._send("Invalid credentials", 401)
                return
            self._send({"token": f"dev-token-{user['id']}", "userId": user["id"], "name": user["name"], "email": user["email"], "role": user["role"]})
        elif path == "/api/auth/register":
            if any(u["email"] == body.get("email") for u in users):
                self._send("Email already registered", 400)
                return
            user = {"id": len(users) + 1, "name": body.get("name"), "email": body.get("email"), "password": body.get("password"), "role": "USER"}
            users.append(user)
            user_skills[user["id"]] = []
            user_goals[user["id"]] = []
            user_activities[user["id"]] = []
            user_predictions[user["id"]] = []
            self._send({"token": f"dev-token-{user['id']}", "userId": user["id"], "name": user["name"], "email": user["email"], "role": user["role"]})
        elif path == "/api/skills":
            user_s = user_skills.setdefault(user_id, [])
            body["id"] = next_id(user_s)
            user_s.append(body)
            self._send(body)
        elif path == "/api/goals":
            user_g = user_goals.setdefault(user_id, [])
            body["id"] = next_id(user_g)
            user_g.append(body)
            self._send(body)
        elif path == "/api/activities":
            user_a = user_activities.setdefault(user_id, [])
            body["id"] = next_id(user_a)
            user_a.append(body)
            self._send(body)
        elif path == "/api/predict":
            user_s = user_skills.get(user_id, [])
            user_a = user_activities.get(user_id, [])
            user_p = user_predictions.setdefault(user_id, [])
            avg = sum(s.get("proficiencyScore", 25) for s in user_s) / max(len(user_s), 1)
            hours = sum(float(a.get("hoursSpent", 0)) for a in user_a)
            score = min(100, round(avg * 0.65 + min(hours, 160) * 0.22, 2))
            prediction = {
                "id": next_id(user_p),
                "readinessScore": score,
                "skillGrowthPrediction": min(100, round(score + 9, 2)),
                "careerSuggestion": "Full Stack Developer" if score >= 65 else "Java Developer",
                "recommendedSkills": "Spring Boot, REST APIs, JavaScript, Cloud Deployment",
                "predictionDate": datetime.now().isoformat(),
            }
            user_p.insert(0, prediction)
            self._send(prediction)
        elif path == "/api/practice/submit":
            lesson_id = body.get("lessonId")
            skill = body.get("skill", "Python")
            difficulty = body.get("difficulty", "Beginner")
            
            file_path = f"frontend/lessons/lesson_{lesson_id}.json"
            title = f"Lesson #{lesson_id}"
            if os.path.exists(file_path):
                try:
                    with open(file_path, "r") as f_in:
                        title = json.load(f_in).get("title", f"Lesson #{lesson_id}")
                except Exception:
                    pass
            
            user_a = user_activities.setdefault(user_id, [])
            completed_title = f"Completed Lesson #{lesson_id} - {title}"
            already_completed = any(act.get("title") == completed_title for act in user_a)
            
            if not already_completed:
                user_a.append({
                    "id": next_id(user_a),
                    "activityType": "Practice Session",
                    "title": completed_title,
                    "hoursSpent": 0.2,
                    "completionDate": datetime.now().strftime("%Y-%m-%d")
                })
                
                user_s = user_skills.setdefault(user_id, [])
                skill_item = next((s for s in user_s if s["skillName"].lower() == skill.lower()), None)
                if skill_item:
                    new_score = min(100, skill_item.get("proficiencyScore", 25) + 3)
                    skill_item["proficiencyScore"] = new_score
                    if new_score < 35:
                        skill_item["proficiencyLevel"] = "Beginner"
                    elif new_score < 70:
                        skill_item["proficiencyLevel"] = "Intermediate"
                    else:
                        skill_item["proficiencyLevel"] = "Advanced"
            
            self._send({
                "status": "Success",
                "message": "Practice session recorded successfully.",
                "pointsAdded": 3
            })
        else:
            self._send({"error": "Not found"}, 404)

    def do_PUT(self):
        path = self.path.split("?")[0]
        body = self._body()
        user_id = self._current_user_id()

        if path.startswith("/api/skills/"):
            user_s = user_skills.setdefault(user_id, [])
            update_list(user_s, path, body)
            self._send(body)
        elif path.startswith("/api/goals/"):
            user_g = user_goals.setdefault(user_id, [])
            update_list(user_g, path, body)
            self._send(body)
        elif path == "/api/profile":
            user = next((u for u in users if u["id"] == user_id), None)
            if user:
                user.update(body)
                user_copy = user.copy()
                user_copy.pop("password", None)
                self._send(user_copy)
            else:
                self._send({"error": "User not found"}, 404)
        else:
            self._send({"error": "Not found"}, 404)

    def do_DELETE(self):
        path = self.path.split("?")[0]
        user_id = self._current_user_id()

        if path.startswith("/api/skills/"):
            user_s = user_skills.get(user_id, [])
            delete_from(user_s, path)
            self._send(None, 204)
        elif path.startswith("/api/goals/"):
            user_g = user_goals.get(user_id, [])
            delete_from(user_g, path)
            self._send(None, 204)
        else:
            self._send({"error": "Not found"}, 404)


def next_id(items):
    return max([item.get("id", 0) for item in items] or [0]) + 1


def item_id(path):
    return int(path.rstrip("/").split("/")[-1])


def update_list(items, path, body):
    body["id"] = item_id(path)
    for index, item in enumerate(items):
        if item.get("id") == body["id"]:
            items[index] = body
            return
    items.append(body)


def delete_from(items, path):
    target = item_id(path)
    items[:] = [item for item in items if item.get("id") != target]


def generate_plan(user_id):
    user_s = user_skills.get(user_id, [])
    user_g = user_goals.get(user_id, [])
    weakest = sorted(user_s, key=lambda item: item.get("proficiencyScore", 0))[0] if user_s else None
    open_goal = next((goal for goal in user_g if not goal.get("completed") and goal.get("progressPercentage", 0) < 100), None)
    plan = [item.copy() for item in learning_plan]
    if weakest:
        plan[0]["title"] = f"Improve {weakest['skillName']}"
        plan[0]["description"] = f"Practice one focused topic and move beyond {weakest['proficiencyLevel']} level."
    if open_goal:
        plan[1]["title"] = f"Goal progress: {open_goal['goalName']}"
        plan[1]["description"] = f"Push this goal from {open_goal.get('progressPercentage', 0)}% toward completion."
    return plan


if __name__ == "__main__":
    print("SkillSphere dev mock API running at http://localhost:8080")
    HTTPServer(("127.0.0.1", 8080), Handler).serve_forever()
