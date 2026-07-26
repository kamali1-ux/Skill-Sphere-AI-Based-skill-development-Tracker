shell("AI Recommendations");
page.innerHTML = `
<div class="panel mb-3">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div><h2 class="h5 mb-1">Readiness Prediction</h2><p class="text-secondary mb-0">Generate a score from current skills, hours, certifications, projects, and proficiency.</p></div>
        <button id="predictBtn" class="btn btn-primary">Run AI Prediction</button>
    </div>
</div>
<div id="result"></div>
<div class="row g-3 mt-1">
    <div class="col-lg-7"><div class="panel"><h2 class="h5">Prediction History</h2><div id="history"></div></div></div>
    <div class="col-lg-5"><div class="panel"><h2 class="h5">Career Paths Covered</h2><div class="d-flex flex-wrap gap-2"><span class="skill-chip">Java Developer</span><span class="skill-chip">Full Stack Developer</span><span class="skill-chip">Data Analyst</span><span class="skill-chip">AI Engineer</span><span class="skill-chip">UI/UX Designer</span><span class="skill-chip">Cybersecurity Analyst</span></div></div></div>
</div>`;

const predictBtn = document.getElementById("predictBtn");
const resultDiv = document.getElementById("result");
const historyEl = document.getElementById("history");

async function loadHistory() {
    const predictions = await api("/predictions");
    historyEl.innerHTML = predictions.length ? predictions.map(p => `<div class="border-bottom py-2"><div class="d-flex justify-content-between gap-2"><strong>${p.careerSuggestion}</strong><span class="status-pill">${p.readinessScore}%</span></div><div class="text-secondary">${new Date(p.predictionDate).toLocaleString()}</div><div class="small mt-1">Growth: ${p.skillGrowthPrediction}%</div><div class="small text-secondary">${p.recommendedSkills}</div></div>`).join("") : emptyState("No predictions yet", "Run your first AI prediction after adding skills and activities.");
}
predictBtn.addEventListener("click", async () => {
    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";
    try {
        const p = await api("/predict", { method: "POST" });
        resultDiv.innerHTML = `<div class="recommendation-card"><div class="row g-3"><div class="col-md-4"><div class="metric"><div class="text-secondary">Readiness</div><div class="value">${p.readinessScore}%</div></div></div><div class="col-md-4"><div class="metric"><div class="text-secondary">Career Path</div><div class="value h3">${p.careerSuggestion}</div></div></div><div class="col-md-4"><div class="metric"><div class="text-secondary">Growth Prediction</div><div class="value">${p.skillGrowthPrediction}%</div></div></div></div><hr><strong>Recommended Skills:</strong> ${p.recommendedSkills}</div>`;
        loadHistory();
    } catch (error) {
        resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}. Start the Python AI service on port 5000.</div>`;
    } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = "Run AI Prediction";
    }
});
loadHistory();

