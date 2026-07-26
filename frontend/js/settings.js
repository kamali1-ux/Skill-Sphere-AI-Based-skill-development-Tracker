// Inject page-specific styles dynamically
const styles = document.createElement("style");
styles.innerHTML = `
    .color-dot {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 3px solid transparent;
        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }
    .color-dot:hover {
        transform: scale(1.1);
    }
    .color-dot.active {
        border-color: #ffffff;
        box-shadow: 0 0 0 2px #000000, 0 4px 10px rgba(0,0,0,0.3);
    }
    .dark-theme .color-dot.active {
        border-color: #000000;
        box-shadow: 0 0 0 2px #ffffff, 0 4px 10px rgba(0,0,0,0.3);
    }
    
    .color-dot.blue { background-color: #0d6efd; }
    .color-dot.green { background-color: #198754; }
    .color-dot.orange { background-color: #fd7e14; }
    .color-dot.red { background-color: #dc3545; }
    .color-dot.purple { background-color: #6f42c1; }
    
    .setting-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: border-color 0.2s;
    }
    .setting-card:hover {
        border-color: var(--bs-primary);
    }
`;
document.head.appendChild(styles);

// Shell layout
shell("Settings & Preferences");

// State
let selectedAccent = localStorage.getItem("skillsphere_accent") || "blue";
let selectedTarget = localStorage.getItem("skillsphere_daily_target") || "10";
let autoPlay = localStorage.getItem("skillsphere_autoplay") === "true";
let plannerAlerts = localStorage.getItem("skillsphere_planner_alerts") !== "false";

function render() {
    const isDark = document.body.classList.contains("dark-theme");
    
    page.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-6">
                <!-- Theme Settings -->
                <div class="panel setting-card mb-4">
                    <h4 class="mb-3">🎨 Theme & Interface</h4>
                    <p class="text-secondary mb-4">Customize the appearance, layouts, and colors of your SkillSphere dashboard.</p>
                    
                    <div class="mb-4">
                        <label class="form-label d-block font-weight-bold">Accent Color</label>
                        <div class="d-flex gap-2 mt-2">
                            <div class="color-dot blue ${selectedAccent === "blue" ? "active" : ""}" onclick="setAccent('blue')" title="Sapphire Blue"></div>
                            <div class="color-dot green ${selectedAccent === "green" ? "active" : ""}" onclick="setAccent('green')" title="Emerald Green"></div>
                            <div class="color-dot orange ${selectedAccent === "orange" ? "active" : ""}" onclick="setAccent('orange')" title="Sunset Orange"></div>
                            <div class="color-dot red ${selectedAccent === "red" ? "active" : ""}" onclick="setAccent('red')" title="Ruby Red"></div>
                            <div class="color-dot purple ${selectedAccent === "purple" ? "active" : ""}" onclick="setAccent('purple')" title="Deep Violet"></div>
                        </div>
                    </div>
                    
                    <div class="form-check form-switch mb-2">
                        <input class="form-check-input" type="checkbox" role="switch" id="modeSwitch" ${isDark ? "checked" : ""}>
                        <label class="form-check-label" for="modeSwitch">Dark Mode Interface</label>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="panel setting-card">
                    <h4 class="mb-3">🔔 Notifications & Reminders</h4>
                    <p class="text-secondary mb-4">Set up alert configurations for weekly planner activities and daily practices.</p>
                    
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" role="switch" id="alertSwitch" ${plannerAlerts ? "checked" : ""}>
                        <label class="form-check-label" for="alertSwitch">Weekly Planner Email Reminders</label>
                        <small class="text-secondary d-block mt-1">Receive a weekly summary of remaining tasks every Monday morning.</small>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6">
                <!-- Practice Settings -->
                <div class="panel setting-card mb-4">
                    <h4 class="mb-3">🎯 Practice Settings</h4>
                    <p class="text-secondary mb-4">Optimize the speed and parameters of the Practice Hub questioning session.</p>
                    
                    <div class="mb-4">
                        <label class="form-label font-weight-bold" for="targetSelect">Daily Practice Target</label>
                        <select class="form-select mt-1" id="targetSelect">
                            <option value="5" ${selectedTarget === "5" ? "selected" : ""}>5 Questions per day (Casual)</option>
                            <option value="10" ${selectedTarget === "10" ? "selected" : ""}>10 Questions per day (Normal)</option>
                            <option value="20" ${selectedTarget === "20" ? "selected" : ""}>20 Questions per day (Intense)</option>
                        </select>
                    </div>
                    
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="autoplaySwitch" ${autoPlay ? "checked" : ""}>
                        <label class="form-check-label" for="autoplaySwitch">Auto-play Next Challenge</label>
                        <small class="text-secondary d-block mt-1">Automatically launch the AI Agent search immediately after submitting a response.</small>
                    </div>
                </div>
                
                <!-- Data Portability -->
                <div class="panel setting-card">
                    <h4 class="mb-3">💾 Data & Portability</h4>
                    <p class="text-secondary mb-4">Manage your personal learning history, backup files, and local session details.</p>
                    
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-outline-primary w-100" onclick="exportData()">
                            Export Profile & Learning Data (JSON)
                        </button>
                        <button class="btn btn-outline-danger w-100 mt-2" onclick="clearLocalStats()">
                            Reset Cache & Clear Statistics
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        
    // Bind listeners
    document.getElementById("modeSwitch").addEventListener("change", (e) => {
        if (e.target.checked) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("skillsphere_theme", "dark");
            
            // Sync default sidebar checkbox if it exists
            const checkbox = document.getElementById("themeCheckbox");
            if (checkbox) checkbox.checked = true;
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("skillsphere_theme", "light");
            
            const checkbox = document.getElementById("themeCheckbox");
            if (checkbox) checkbox.checked = false;
        }
        render(); // Re-render to update active styling outline on colors if needed
    });
    
    document.getElementById("alertSwitch").addEventListener("change", (e) => {
        plannerAlerts = e.target.checked;
        localStorage.setItem("skillsphere_planner_alerts", plannerAlerts ? "true" : "false");
    });
    
    document.getElementById("targetSelect").addEventListener("change", (e) => {
        selectedTarget = e.target.value;
        localStorage.setItem("skillsphere_daily_target", selectedTarget);
    });
    
    document.getElementById("autoplaySwitch").addEventListener("change", (e) => {
        autoPlay = e.target.checked;
        localStorage.setItem("skillsphere_autoplay", autoPlay ? "true" : "false");
    });
}

function setAccent(color) {
    selectedAccent = color;
    localStorage.setItem("skillsphere_accent", color);
    
    const colors = {
        blue: "#0d6efd",
        green: "#198754",
        orange: "#fd7e14",
        red: "#dc3545",
        purple: "#6f42c1"
    };
    
    const accentColor = colors[color];
    document.documentElement.style.setProperty("--bs-primary", accentColor);
    
    const bigint = parseInt(accentColor.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    document.documentElement.style.setProperty("--bs-primary-rgb", `${r}, ${g}, ${b}`);
    
    render();
}

async function exportData() {
    try {
        const skills = await api("/skills");
        const goals = await api("/goals");
        const activities = await api("/activities");
        const profile = await api("/profile");
        
        const backup = {
            exportedAt: new Date().toISOString(),
            profile,
            skills,
            goals,
            activities
        };
        
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `skillsphere_backup_${profile.name || "user"}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error(e);
        alert("Failed to export profile data. Please verify network API server.");
    }
}

function clearLocalStats() {
    if (confirm("Are you sure you want to delete all cached session data and statistics? This will reset your practice streaks, daily targets, and custom layout settings.")) {
        const token = localStorage.getItem("skillsphere_token");
        const user = localStorage.getItem("skillsphere_user");
        
        localStorage.clear();
        
        // Restore essential authentication
        if (token) localStorage.setItem("skillsphere_token", token);
        if (user) localStorage.setItem("skillsphere_user", user);
        
        window.location.reload();
    }
}

// Start
render();
