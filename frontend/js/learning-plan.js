shell("Learning Plan");

page.innerHTML = `
<div class="row g-3">
    <div class="col-xl-8">
        <div class="panel">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                    <h2 class="h5 mb-1">Weekly Focus Plan</h2>
                    <div class="text-secondary">A simple roadmap generated from your goals, activities, and skill levels.</div>
                </div>
                <button class="btn btn-primary" id="refreshPlan">Refresh Plan</button>
            </div>
            <div id="planRows" class="plan-list"></div>
        </div>
    </div>
    <div class="col-xl-4">
        <div class="recommendation-card mb-3">
            <div class="eyebrow">Priority</div>
            <h2 class="h5 mt-1" id="focusSkill">Loading...</h2>
            <p class="mb-0 text-secondary" id="focusReason"></p>
        </div>
        <div class="panel">
            <h2 class="h5">Study Targets</h2>
            <div id="targets"></div>
        </div>
    </div>
</div>`;

const planRows = document.getElementById("planRows");
const focusSkill = document.getElementById("focusSkill");
const focusReason = document.getElementById("focusReason");
const targets = document.getElementById("targets");
const refreshPlan = document.getElementById("refreshPlan");

async function loadPlan() {
    const [plan, skills, activities] = await Promise.all([
        api("/learning-plan"),
        api("/skills"),
        api("/activities")
    ]);

    const weakest = [...skills].sort((a, b) => (a.proficiencyScore || 0) - (b.proficiencyScore || 0))[0];
    focusSkill.textContent = weakest ? `${weakest.skillName} improvement` : "Add your first skill";
    focusReason.textContent = weakest
        ? `${weakest.skillName} is currently at ${weakest.proficiencyLevel}. Raising it will improve your readiness score.`
        : "SkillSphere can generate a stronger plan once your profile has skills.";

    const completedDaysKey = `skillsphere_completed_days_${currentUser().id || "default"}`;
    const completedDays = JSON.parse(localStorage.getItem(completedDaysKey) || "[]");

    planRows.innerHTML = plan.length
        ? plan.map(item => {
            const isCompleted = completedDays.includes(item.day);
            return `
            <div class="plan-item d-flex align-items-center justify-content-between p-3 border rounded mb-2 ${isCompleted ? "completed" : ""}" onclick="toggleDay('${item.day}')">
                <div class="d-flex align-items-center gap-3">
                    <input type="checkbox" class="form-check-input m-0" ${isCompleted ? "checked" : ""} onclick="event.stopPropagation(); toggleDay('${item.day}')" style="cursor:pointer;" />
                    <div>
                        <div class="plan-day fw-bold text-primary mb-1">${item.day}</div>
                        <strong>${item.title}</strong>
                        <div class="text-secondary small">${item.description}</div>
                    </div>
                </div>
                <span class="status-pill ${isCompleted ? "done" : "warn"}">${isCompleted ? "Done" : item.duration}</span>
            </div>`;
        }).join("")
        : emptyState("No plan yet", "Add skills and goals to generate a focused weekly plan.");

    const totalHours = activities.reduce((sum, activity) => sum + Number(activity.hoursSpent || 0), 0);
    
    // Calculate additional hours from completed tasks in the weekly plan
    const completedHours = completedDays.reduce((sum, day) => {
        const item = plan.find(p => p.day === day);
        if (!item) return sum;
        const mins = parseInt(item.duration) || 0;
        return sum + (mins / 60);
    }, 0);

    const displayHours = Math.round((totalHours + completedHours) * 10) / 10;

    targets.innerHTML = `
        <div class="d-flex justify-content-between border-bottom py-2"><span>Weekly hours target</span><strong>8 hrs</strong></div>
        <div class="d-flex justify-content-between border-bottom py-2"><span>Current logged</span><strong>${displayHours} hrs</strong></div>
        <div class="d-flex justify-content-between py-2"><span>Next milestone</span><strong>${weakest ? "Level up " + weakest.skillName : "Create skill"}</strong></div>`;
}

window.toggleDay = function(day) {
    const completedDaysKey = `skillsphere_completed_days_${currentUser().id || "default"}`;
    let completedDays = JSON.parse(localStorage.getItem(completedDaysKey) || "[]");
    
    if (completedDays.includes(day)) {
        completedDays = completedDays.filter(d => d !== day);
    } else {
        completedDays.push(day);
    }
    
    localStorage.setItem(completedDaysKey, JSON.stringify(completedDays));
    loadPlan();
};

refreshPlan.addEventListener("click", loadPlan);
loadPlan().catch(error => {
    document.getElementById("page").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
});

