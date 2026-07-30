shell("Learning Activity Tracking");
page.innerHTML = `
<div class="row g-3 mb-3" id="activityStats"></div>
<div class="panel mb-3">
    <form id="activityForm" class="row g-3">
        <div class="col-md-3"><label class="form-label">Type</label><select class="form-select" id="activityType"><option>Course</option><option>Certification</option><option>Practice</option><option>Project</option></select></div>
        <div class="col-md-3"><label class="form-label">Title</label><input class="form-control" id="title" required></div>
        <div class="col-md-3"><label class="form-label">Hours</label><input class="form-control" id="hoursSpent" type="number" min="0" step="0.5" required></div>
        <div class="col-md-2"><label class="form-label">Completion</label><input class="form-control" id="completionDate" type="date" required></div>
        <div class="col-md-1 d-flex align-items-end"><button class="btn btn-primary w-100">Add</button></div>
    </form>
</div>
<div class="panel"><table class="table"><thead><tr><th>Type</th><th>Title</th><th>Hours</th><th>Date</th></tr></thead><tbody id="rows"></tbody></table></div>`;

async function load() {
    const activities = await api("/activities");
    const total = activities.reduce((sum, a) => sum + Number(a.hoursSpent || 0), 0);
    const projects = activities.filter(a => a.activityType === "Project").length;
    const certs = activities.filter(a => a.activityType === "Certification").length;
    activityStats.innerHTML = [
        ["Total Hours", total],
        ["Projects", projects],
        ["Certifications", certs],
        ["Activities", activities.length]
    ].map(([label, value]) => `<div class="col-md-3"><div class="panel metric"><div class="text-secondary">${label}</div><div class="value">${value}</div></div></div>`).join("");
    rows.innerHTML = activities.length
        ? activities.map(a => `<tr><td><span class="skill-chip">${a.activityType}</span></td><td><strong>${a.title || ""}</strong></td><td>${a.hoursSpent}</td><td>${a.completionDate}</td></tr>`).join("")
        : `<tr><td colspan="4">${emptyState("No learning activities", "Log courses, certifications, practice hours, or projects.")}</td></tr>`;
}
activityForm.addEventListener("submit", async event => {
    event.preventDefault();
    await api("/activities", { method: "POST", body: JSON.stringify({ activityType: activityType.value, title: title.value, hoursSpent: Number(hoursSpent.value), completionDate: completionDate.value }) });
    activityForm.reset(); load();
});
load();
