# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Yes     |

## Reporting a Vulnerability

If you discover a security vulnerability in **SkillSphere**, please **do not open a public GitHub Issue**.

Instead, please report it privately using one of the following methods:

1. **Email**: Open a private contact via the GitHub repository's **Security → Advisories** tab.
2. **GitHub Private Advisory**: Navigate to the repository → **Security** → **Report a vulnerability**.

Please include as much detail as possible:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

We will acknowledge your report within **72 hours** and work to resolve valid issues promptly.

## Security Considerations for Self-Hosted Deployments

Before deploying SkillSphere in any environment beyond localhost:

- **Replace the JWT secret**: Set a strong `JWT_SECRET` environment variable (64+ random characters).
- **Secure your MySQL credentials**: Never use `root` with a simple password in production.
- **Configure CORS**: Update `SecurityConfig.java` with only your actual frontend domain(s).
- **Disable `debug=True`**: In `ai-module/app.py`, run Flask with `debug=False` in production.
- **Use HTTPS**: Place the backend behind a reverse proxy (e.g., Nginx) with an SSL certificate.
- **Set `spring.jpa.hibernate.ddl-auto=none`**: Disable auto DDL in production; use Flyway/Liquibase migrations instead.
