const API_BASE = "http://localhost:8080/api";

(function initTheme() {
    const theme = localStorage.getItem("skillsphere_theme") || "light";
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    }
    const accent = localStorage.getItem("skillsphere_accent") || "blue";
    const colors = {
        blue: "#0d6efd",
        green: "#198754",
        orange: "#fd7e14",
        red: "#dc3545",
        purple: "#6f42c1"
    };
    const accentColor = colors[accent] || colors.blue;
    document.documentElement.style.setProperty("--bs-primary", accentColor);
    const bigint = parseInt(accentColor.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    document.documentElement.style.setProperty("--bs-primary-rgb", `${r}, ${g}, ${b}`);
})();


function token() {
    return localStorage.getItem("skillsphere_token");
}

function currentUser() {
    return JSON.parse(localStorage.getItem("skillsphere_user") || "{}");
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`
    };
}

async function api(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...(options.auth === false ? { "Content-Type": "application/json" } : authHeaders()),
            ...(options.headers || {})
        }
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request failed");
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

function requireAuth() {
    if (!token()) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("skillsphere_token");
    localStorage.removeItem("skillsphere_user");
    window.location.href = "login.html";
}

function setActiveNav() {
    const page = location.pathname.split("/").pop();
    document.querySelectorAll("[data-nav]").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === page);
    });
}

function levelClass(score) {
    if (score >= 80) return "success";
    if (score >= 55) return "primary";
    if (score >= 35) return "warning";
    return "secondary";
}

function emptyState(title, detail) {
    return `<div class="empty-state"><div class="empty-icon">+</div><strong>${title}</strong><p>${detail}</p></div>`;
}

function shell(title) {
    requireAuth();
    document.body.innerHTML = `
        <div class="app-shell">
            <aside class="sidebar d-flex flex-column">
                <div class="d-flex align-items-center gap-2 mb-4">
                    <span class="brand-mark">S</span>
                    <div>
                        <strong>SkillSphere</strong>
                        <div class="small text-secondary">${currentUser().name || "Learner"}</div>
                    </div>
                </div>
                <nav class="nav flex-column gap-1">
                    <a data-nav class="nav-link" href="dashboard.html">Dashboard</a>
                    <a data-nav class="nav-link" href="skills.html">Skills</a>
                    <a data-nav class="nav-link" href="goals.html">Goals</a>
                    <a data-nav class="nav-link" href="activities.html">Activities</a>
                    <a data-nav class="nav-link" href="learning-plan.html">Learning Plan</a>
                    <a data-nav class="nav-link" href="recommendations.html">AI Recommendations</a>
                    <a data-nav class="nav-link" href="practice.html">Practice Hub</a>
                    <a data-nav class="nav-link" href="profile.html">Profile</a>
                    <a data-nav class="nav-link" href="settings.html">Settings</a>
                </nav>
                <div class="theme-switch-wrapper">
                    <span class="theme-switch-label">Dark Mode</span>
                    <label class="theme-switch" for="themeCheckbox">
                        <input type="checkbox" id="themeCheckbox" />
                        <div class="slider"></div>
                    </label>
                </div>
                <button class="btn btn-outline-light w-100 mt-2" onclick="logout()">Logout</button>
            </aside>
            <main class="content">
                <div class="topbar mb-3">
                    <div>
                        <div class="eyebrow">SkillSphere Workspace</div>
                        <h1 class="h3 m-0">${title}</h1>
                    </div>
                    <span class="badge rounded-pill text-bg-primary">Live Demo</span>
                </div>
                <div id="page"></div>
            </main>
        </div>`;
    setActiveNav();

    // Bind Theme Toggle
    const themeCheckbox = document.getElementById("themeCheckbox");
    if (themeCheckbox) {
        const currentTheme = localStorage.getItem("skillsphere_theme") || "light";
        themeCheckbox.checked = currentTheme === "dark";
        themeCheckbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                document.body.classList.add("dark-theme");
                localStorage.setItem("skillsphere_theme", "dark");
            } else {
                document.body.classList.remove("dark-theme");
                localStorage.setItem("skillsphere_theme", "light");
            }
        });
    }
}

function proficiencyScore(level) {
    return { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[level] || 25;
}
