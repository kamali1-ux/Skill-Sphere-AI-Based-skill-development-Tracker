shell("Skills Management");
page.innerHTML = `
<div class="panel mb-3">
    <form id="skillForm" class="row g-3">
        <input type="hidden" id="skillId">
        <div class="col-md-3"><label class="form-label">Skill</label><input class="form-control" id="skillName" required></div>
        <div class="col-md-3"><label class="form-label">Category</label><select class="form-select" id="category"><option>Programming</option><option>Communication</option><option>Leadership</option><option>Design</option><option>Marketing</option><option>Data Science</option></select></div>
        <div class="col-md-3"><label class="form-label">Level</label><select class="form-select" id="proficiencyLevel"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option></select></div>
        <div class="col-md-3 d-flex align-items-end"><button class="btn btn-primary w-100">Save Skill</button></div>
    </form>
</div>
<div class="panel mb-3">
    <div class="toolbar">
        <input class="form-control" id="searchSkill" placeholder="Search skills">
        <select class="form-select" id="filterCategory">
            <option value="">All categories</option>
            <option>Programming</option><option>Communication</option><option>Leadership</option><option>Design</option><option>Marketing</option><option>Data Science</option>
        </select>
    </div>
</div>
<div class="panel"><table class="table"><thead><tr><th>Skill</th><th>Category</th><th>Level</th><th>Score</th><th></th></tr></thead><tbody id="rows"></tbody></table></div>`;

let cachedSkills = [];

async function load() {
    cachedSkills = await api("/skills");
    render();
}

function render() {
    const query = searchSkill.value.toLowerCase();
    const categoryValue = filterCategory.value;
    const filtered = cachedSkills.filter(s =>
        s.skillName.toLowerCase().includes(query) &&
        (!categoryValue || s.category === categoryValue)
    );
    rows.innerHTML = filtered.length
        ? filtered.map(s => `<tr><td><strong>${s.skillName}</strong></td><td><span class="skill-chip">${s.category}</span></td><td>${s.proficiencyLevel}</td><td><div class="d-flex align-items-center gap-2"><div class="progress flex-grow-1"><div class="progress-bar bg-${levelClass(s.proficiencyScore)}" style="width:${s.proficiencyScore}%"></div></div><strong>${s.proficiencyScore}</strong></div></td><td class="text-end"><button class="btn btn-sm btn-outline-primary" onclick='editSkill(${JSON.stringify(s)})'>Edit</button> <button class="btn btn-sm btn-outline-danger" onclick="deleteSkill(${s.id})">Delete</button></td></tr>`).join("")
        : `<tr><td colspan="5">${emptyState("No matching skills", "Try a different search or category filter.")}</td></tr>`;
}

function editSkill(s) {
    skillId.value = s.id;
    skillName.value = s.skillName;
    category.value = s.category;
    proficiencyLevel.value = s.proficiencyLevel;
}

async function deleteSkill(id) {
    await api(`/skills/${id}`, { method: "DELETE" });
    load();
}

skillForm.addEventListener("submit", async event => {
    event.preventDefault();
    const body = { skillName: skillName.value, category: category.value, proficiencyLevel: proficiencyLevel.value, proficiencyScore: proficiencyScore(proficiencyLevel.value) };
    await api(skillId.value ? `/skills/${skillId.value}` : "/skills", { method: skillId.value ? "PUT" : "POST", body: JSON.stringify(body) });
    skillForm.reset();
    skillId.value = "";
    load();
});
searchSkill.addEventListener("input", render);
filterCategory.addEventListener("change", render);
load();
