shell("Goals Management");
page.innerHTML = `
<div class="panel mb-3">
    <form id="goalForm" class="row g-3">
        <input type="hidden" id="goalId">
        <div class="col-md-4"><label class="form-label">Goal</label><input class="form-control" id="goalName" required></div>
        <div class="col-md-3"><label class="form-label">Target Date</label><input class="form-control" id="targetDate" type="date" required></div>
        <div class="col-md-3"><label class="form-label">Progress %</label><input class="form-control" id="progressPercentage" type="number" min="0" max="100" value="0"></div>
        <div class="col-md-2 d-flex align-items-end"><button class="btn btn-primary w-100">Save</button></div>
    </form>
</div>
<div class="panel"><table class="table"><thead><tr><th>Goal</th><th>Target</th><th>Progress</th><th>Status</th><th></th></tr></thead><tbody id="rows"></tbody></table></div>`;

async function load() {
    const goals = await api("/goals");
    rows.innerHTML = goals.length
        ? goals.map(g => `<tr><td>${g.goalName}</td><td>${g.targetDate}</td><td><div class="progress"><div class="progress-bar" style="width:${g.progressPercentage}%">${g.progressPercentage}%</div></div></td><td>${g.completed ? "Completed" : "In Progress"}</td><td class="text-end"><button class="btn btn-sm btn-outline-primary" onclick='editGoal(${JSON.stringify(g)})'>Edit</button> <button class="btn btn-sm btn-outline-danger" onclick="deleteGoal(${g.id})">Delete</button></td></tr>`).join("")
        : `<tr><td colspan="5">${emptyState("No goals created", "Start by creating a learning goal for this month.")}</td></tr>`;
}
function editGoal(g) { goalId.value = g.id; goalName.value = g.goalName; targetDate.value = g.targetDate; progressPercentage.value = g.progressPercentage; }
async function deleteGoal(id) { await api(`/goals/${id}`, { method: "DELETE" }); load(); }
goalForm.addEventListener("submit", async event => {
    event.preventDefault();
    const progress = Number(progressPercentage.value);
    await api(goalId.value ? `/goals/${goalId.value}` : "/goals", { method: goalId.value ? "PUT" : "POST", body: JSON.stringify({ goalName: goalName.value, targetDate: targetDate.value, progressPercentage: progress, completed: progress >= 100 }) });
    goalForm.reset(); goalId.value = ""; progressPercentage.value = 0; load();
});
load();
