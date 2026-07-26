shell("Dashboard Analytics");

document.getElementById("page").innerHTML = `
<div class="row g-3 mb-3" id="metrics"></div>
<div class="row g-3">
    <div class="col-xl-8"><div class="panel"><h2 class="h5">Next Actions</h2><div id="nextActions"></div></div></div>
    <div class="col-xl-4 d-flex flex-column gap-3">
        <div class="panel"><h2 class="h5">Readiness Snapshot</h2><div id="snapshot"></div></div>
        <div class="panel"><h2 class="h5">Achievements & Badges</h2><div id="achievementsGrid" class="badge-grid"></div></div>
    </div>
    <div class="col-lg-6"><div class="panel"><h2 class="h5">Category Strengths (Radar)</h2><canvas id="radarChart"></canvas></div></div>
    <div class="col-lg-6"><div class="panel"><h2 class="h5">Skill Distribution</h2><canvas id="distributionChart"></canvas></div></div>
    <div class="col-lg-6"><div class="panel"><h2 class="h5">Learning Hours Per Month</h2><canvas id="hoursChart"></canvas></div></div>
    <div class="col-lg-6"><div class="panel"><h2 class="h5">Goal Completion Status</h2><canvas id="goalsChart"></canvas></div></div>
    <div class="col-12"><div class="panel"><h2 class="h5">Readiness Score Trend</h2><canvas id="readinessChart"></canvas></div></div>
</div>`;

async function loadDashboard() {
    const [skills, goals, activities, predictions] = await Promise.all([
        api("/skills"),
        api("/goals"),
        api("/activities"),
        api("/predictions")
    ]);

    const metrics = document.getElementById("metrics");
    const nextActions = document.getElementById("nextActions");
    const snapshot = document.getElementById("snapshot");
    const achievementsGrid = document.getElementById("achievementsGrid");
    
    const radarChart = document.getElementById("radarChart");
    const distributionChart = document.getElementById("distributionChart");
    const hoursChart = document.getElementById("hoursChart");
    const goalsChart = document.getElementById("goalsChart");
    const readinessChart = document.getElementById("readinessChart");

    const hours = activities.reduce((sum, item) => sum + Number(item.hoursSpent || 0), 0);
    const avg = Math.round(skills.reduce((sum, item) => sum + Number(item.proficiencyScore || 0), 0) / Math.max(skills.length, 1));
    const latest = predictions[0]?.readinessScore || 0;
    const completed = goals.filter(g => g.completed || g.progressPercentage >= 100).length;
    const openGoals = goals.filter(g => !g.completed && g.progressPercentage < 100).sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    const weakest = [...skills].sort((a, b) => (a.proficiencyScore || 0) - (b.proficiencyScore || 0))[0];
    
    // Render metrics
    metrics.innerHTML = [
        ["Skills", skills.length, "Tracked across categories"],
        ["Learning Hours", hours, "Courses, practice, projects"],
        ["Goal Progress", `${Math.round(goals.reduce((s, g) => s + (g.progressPercentage || 0), 0) / Math.max(goals.length, 1))}%`, `${completed}/${goals.length} completed`],
        ["Readiness", `${latest || avg}%`, latest ? "Latest AI prediction" : "Based on skill average"]
    ].map(([label, value, caption]) => `<div class="col-md-3"><div class="panel metric"><div class="text-secondary">${label}</div><div class="value">${value}</div><div class="metric-caption">${caption}</div></div></div>`).join("");

    // Render next actions
    nextActions.innerHTML = [
        weakest ? `Improve <strong>${weakest.skillName}</strong> from ${weakest.proficiencyLevel}.` : "Add at least one skill to unlock progress tracking.",
        openGoals[0] ? `Focus on <strong>${openGoals[0].goalName}</strong> before ${openGoals[0].targetDate}.` : "Create a new learning goal for this month.",
        activities.length ? "Log one more practice session this week." : "Add a course, certification, practice session, or project."
    ].map(text => `<div class="d-flex gap-2 border-bottom py-2"><span class="status-pill">Task</span><div>${text}</div></div>`).join("");

    // Render snapshot
    snapshot.innerHTML = `
        <div class="display-5 fw-bold text-primary">${latest || avg}%</div>
        <div class="text-secondary mb-3">${latest ? "Predicted readiness score" : "Estimated from current skills"}</div>
        <div class="progress mb-2"><div class="progress-bar" style="width:${latest || avg}%"></div></div>
        <div class="small text-secondary">Run AI Recommendations after adding activities for a stronger score.</div>`;

    // Render achievements
    const badges = [
        { id: "first_step", title: "First Steps", desc: "Added first skill", icon: "🌱", unlocked: skills.length >= 1 },
        { id: "deep_focus", title: "Deep Focus", desc: "Logged 50+ hours", icon: "⚡", unlocked: hours >= 50 },
        { id: "goal_crusher", title: "Goal Crusher", desc: "Completed 1+ goals", icon: "🏆", unlocked: completed >= 1 },
        { id: "ai_explorer", title: "AI Explorer", desc: "Ran AI prediction", icon: "🔮", unlocked: predictions.length >= 1 }
    ];
    achievementsGrid.innerHTML = badges.map(b => `
        <div class="achievement-card ${b.unlocked ? "" : "locked"}" title="${b.desc}">
            <div class="achievement-icon">${b.icon}</div>
            <div class="achievement-title">${b.title}</div>
            <div class="achievement-desc">${b.desc}</div>
        </div>
    `).join("");

    // Render Radar Chart for category averages
    const categoriesList = ["Programming", "Data Science", "Communication", "Design", "Marketing", "Leadership"];
    const categoryAverages = categoriesList.map(cat => {
        const catSkills = skills.filter(s => s.category === cat);
        if (catSkills.length === 0) return 0;
        return Math.round(catSkills.reduce((sum, s) => sum + Number(s.proficiencyScore || 0), 0) / catSkills.length);
    });

    const isDark = document.body.classList.contains("dark-theme");
    const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#94a3b8" : "#697386";

    new Chart(radarChart, {
        type: "radar",
        data: {
            labels: categoriesList,
            datasets: [{
                label: "Category Proficiency",
                data: categoryAverages,
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                borderColor: "#3b82f6",
                pointBackgroundColor: "#3b82f6",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#3b82f6",
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { color: textColor, font: { weight: "600", size: 10 } },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Render Skill Category Distribution Pie Chart
    const categories = [...new Set(skills.map(s => s.category))];
    new Chart(distributionChart, {
        type: "pie",
        data: { labels: categories, datasets: [{ data: categories.map(c => skills.filter(s => s.category === c).length), backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"] }] },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Render Learning Hours Bar Chart
    const monthMap = {};
    activities.forEach(a => {
        const month = (a.completionDate || "").slice(0, 7) || "Unscheduled";
        monthMap[month] = (monthMap[month] || 0) + Number(a.hoursSpent || 0);
    });
    new Chart(hoursChart, {
        type: "bar",
        data: { labels: Object.keys(monthMap), datasets: [{ label: "Hours", data: Object.values(monthMap), backgroundColor: "#16a34a" }] },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Render Goals completion Doughnut Chart
    new Chart(goalsChart, {
        type: "doughnut",
        data: { labels: ["Completed", "In Progress"], datasets: [{ data: [completed, Math.max(goals.length - completed, 0)], backgroundColor: ["#16a34a", "#f59e0b"] }] },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Render Readiness score Line Chart
    const trend = [...predictions].reverse();
    new Chart(readinessChart, {
        type: "line",
        data: { labels: trend.map(p => new Date(p.predictionDate).toLocaleDateString()), datasets: [{ label: "Readiness Score", data: trend.map(p => p.readinessScore), borderColor: "#dc2626", tension: 0.3 }] },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

loadDashboard().catch(error => {
    document.getElementById("page").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
});

