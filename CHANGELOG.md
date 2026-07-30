# Changelog

All notable changes to **SkillSphere** will be documented in this file.

This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

---

## [1.0.0] – 2026-07-27

### Added
- Full-stack skill development tracker with Java Spring Boot REST API backend.
- JWT-based authentication (register/login) with BCrypt password hashing.
- Skill management: create, update, delete, and categorize skills with proficiency levels.
- Learning goals with target dates, progress percentages, and completion tracking.
- Learning activities log (courses, certifications, practice hours, projects).
- AI-powered predictions using a Python Flask microservice with a Random Forest Regressor model.
- Career path suggestions and recommended skills based on user data.
- Auto-generated weekly learning plan based on weakest skill and open goal.
- Analytics dashboard with Chart.js (skill distribution, progress, hours, readiness trend).
- Practice Hub with interactive lesson questions served from JSON lesson files.
- Dark/light theme toggle and accent color settings (persisted in localStorage).
- Achievements/badges system in the settings page.
- In-memory development mock API (`dev-mock-api.py`) for frontend-only testing without Java/MySQL.
- MySQL schema and sample data SQL scripts.
- MIT License added.
- `CONTRIBUTING.md` contributor guide.
- `SECURITY.md` responsible disclosure policy.
- `.env.example` for environment variable documentation.

### Fixed
- **Security**: Removed `"null"` from CORS allowed origins in `SecurityConfig.java`.
- **Bug**: Fixed potential `NullPointerException` in `GoalController.update()` when `progressPercentage` is null.
- **Security/Stability**: Added `JwtException` try-catch in `JwtAuthenticationFilter` to return HTTP 401 instead of crashing with HTTP 500 on invalid/expired tokens.

### Changed
- `application.properties` now reads credentials from environment variables with safe local defaults (no real secrets committed to source control).
- `.gitignore` extended to cover `.venv312/`, `.env`, OS files (`Thumbs.db`, `.DS_Store`), and IDE folders.
- `README.md` rewritten as a professional, portfolio-ready document with badges, architecture overview, API reference, and deployment guide.

---

_This is the initial public release._
