# Contributing to SkillSphere

Thank you for your interest in contributing to **SkillSphere**! 🎉

We welcome bug reports, feature suggestions, documentation improvements, and pull requests.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Standards](#coding-standards)

---

## Code of Conduct

Be respectful, inclusive, and constructive. Harassment or abusive behaviour of any kind will not be tolerated.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/Skill-Sphere-AI-Based-skill-development-Tracker.git
   cd Skill-Sphere-AI-Based-skill-development-Tracker
   ```
3. **Set up the project** by following the [README setup guide](./README.md#-installation--setup).
4. Create a new branch for your change:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Reporting Bugs

Before opening an issue, please:
- Search existing issues to avoid duplicates.
- Test against the latest version of the `main` branch.

When reporting a bug, include:
- A clear title and description
- Steps to reproduce
- Expected vs. actual behaviour
- Screenshots or error logs if available
- Your OS, Java version, Python version, and browser

---

## Suggesting Features

Open a **GitHub Issue** with the label `enhancement`. Include:
- A clear description of the proposed feature
- The problem it solves
- Any alternative approaches you considered

---

## Submitting a Pull Request

1. Ensure your code compiles and runs correctly:
   - `mvn clean compile` in `backend-java/`
   - `python app.py` in `ai-module/` (after training)
2. Write clear commit messages (see standards below).
3. Push your branch and open a Pull Request against `main`.
4. Describe **what** changed and **why** in the PR description.

---

## Coding Standards

### Java (Spring Boot)
- Follow standard Java naming conventions (camelCase for methods, PascalCase for classes).
- Use constructor injection, not field injection.
- Return proper HTTP status codes from controllers.

### Python (Flask / AI)
- Follow [PEP 8](https://peps.python.org/pep-0008/).
- Keep `app.py` and `train_model.py` separate — don't mix training code with the API.

### JavaScript (Frontend)
- Use `async/await` for all API calls.
- Always handle errors gracefully — show user-friendly messages.

### Commit Message Format
```
type(scope): short description

Examples:
feat(auth): add email verification on registration
fix(goal): prevent NPE when progressPercentage is null
docs(readme): add deployment section
```

---

Thank you for helping make SkillSphere better! 🚀
