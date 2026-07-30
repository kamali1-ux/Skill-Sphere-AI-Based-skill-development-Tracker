// Inject custom page-specific styles dynamically
const styles = document.createElement("style");
styles.innerHTML = `
    .option-card {
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .option-card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--bs-primary);
        box-shadow: 0 0 10px rgba(13, 110, 253, 0.2);
    }
    .option-card.selected {
        background: rgba(13, 110, 253, 0.15) !important;
        border-color: #0d6efd !important;
        box-shadow: 0 0 15px rgba(13, 110, 253, 0.4) !important;
    }
    .option-card.correct {
        background: rgba(25, 135, 84, 0.15) !important;
        border-color: #198754 !important;
        box-shadow: 0 0 15px rgba(25, 135, 84, 0.4) !important;
    }
    .option-card.incorrect {
        background: rgba(220, 53, 69, 0.15) !important;
        border-color: #dc3545 !important;
        box-shadow: 0 0 15px rgba(220, 53, 69, 0.4) !important;
    }
    
    .terminal-shell {
        background: #090d16;
        border: 1px solid #1e293b;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .terminal-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
    }
    .terminal-dot.red { background: #ef4444; }
    .terminal-dot.yellow { background: #f59e0b; }
    .terminal-dot.green { background: #10b981; }

    #terminalLogs {
        font-family: 'Courier New', Courier, monospace;
        color: #10b981;
        font-size: 0.95rem;
        line-height: 1.6;
        overflow-y: auto;
        max-height: 300px;
    }
    
    .stats-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--bs-primary);
    }
`;
document.head.appendChild(styles);

// Shell title
shell("Practice Hub");

// State
let userSkills = [];
let streak = 0;
let completedCount = 0;
let totalAttempts = 0;
let correctAttempts = 0;
let currentQuestion = null;
let selectedOption = null;
let selectedSkill = "";
let selectedDifficulty = "";

// Initialize
async function load() {
    loadStats();
    try {
        userSkills = await api("/skills");
        renderSelection();
    } catch (err) {
        console.error(err);
        page.innerHTML = `<div class="alert alert-danger">Error loading Practice Hub data. Please check connection.</div>`;
    }
}

function loadStats() {
    const userId = currentUser().userId || 1;
    const saved = localStorage.getItem("skillsphere_practice_stats_" + userId);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            streak = data.streak || 0;
            completedCount = data.completedCount || 0;
            totalAttempts = data.totalAttempts || 0;
            correctAttempts = data.correctAttempts || 0;
        } catch (e) {
            console.error(e);
        }
    }
}

function saveStats() {
    const userId = currentUser().userId || 1;
    const stats = { streak, completedCount, totalAttempts, correctAttempts };
    localStorage.setItem("skillsphere_practice_stats_" + userId, JSON.stringify(stats));
}

function renderSelection() {
    if (!userSkills || userSkills.length === 0) {
        page.innerHTML = `
            <div class="panel text-center py-5">
                <div class="mb-4" style="font-size: 3.5rem;">🎯</div>
                <h3>No Skills Found</h3>
                <p class="text-secondary max-width-md mx-auto mb-4" style="max-width: 500px;">
                    You haven't added any skills to your profile yet. Add the skills you want to learn to launch topic-specific practice challenges.
                </p>
                <a href="skills.html" class="btn btn-primary btn-lg px-4">Go to Skills Management</a>
            </div>`;
        return;
    }

    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    page.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="panel h-100">
                    <h3 class="mb-3">Start a Practice Session</h3>
                    <p class="text-secondary mb-4">
                        Select one of your added skills and set the desired difficulty level. Our AI Search Agent will crawl public forums, interview repositories, and documentation to construct a custom challenge.
                    </p>
                    
                    <form id="setupForm" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label font-weight-bold">Skill Topic</label>
                            <select class="form-select" id="skillSelect" required>
                                ${userSkills.map(s => `<option value="${s.skillName}">${s.skillName} (${s.proficiencyLevel})</option>`).join("")}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label font-weight-bold">Difficulty Level</label>
                            <select class="form-select" id="diffSelect" required>
                                <option value="Beginner">Beginner (Fundamentals & Syntax)</option>
                                <option value="Intermediate" selected>Intermediate (Applications & Logic)</option>
                                <option value="Advanced">Advanced (Architectures & Optimization)</option>
                            </select>
                        </div>
                        <div class="col-12 mt-4">
                            <button type="submit" class="btn btn-primary btn-lg w-100">
                                Launch AI Practice Agent 🚀
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="panel h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="mb-3">Session Stats</h4>
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="card bg-body-tertiary border-0 p-3 text-center">
                                    <small class="text-secondary d-block mb-1">Streak</small>
                                    <span class="stats-value text-warning">${streak} 🔥</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card bg-body-tertiary border-0 p-3 text-center">
                                    <small class="text-secondary d-block mb-1">Accuracy</small>
                                    <span class="stats-value text-success">${accuracy}%</span>
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <div class="card bg-body-tertiary border-0 p-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <small class="text-secondary">Total Completed</small>
                                        <strong>${completedCount}</strong>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <small class="text-secondary">Attempts</small>
                                        <strong>${correctAttempts} / ${totalAttempts}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-outline-danger btn-sm w-100 mt-4" onclick="resetStats()">
                        Reset Stats & Progress
                    </button>
                </div>
            </div>
        </div>`;

    document.getElementById("setupForm").addEventListener("submit", event => {
        event.preventDefault();
        selectedSkill = document.getElementById("skillSelect").value;
        selectedDifficulty = document.getElementById("diffSelect").value;
        launchAgent();
    });
}

function launchAgent() {
    page.innerHTML = `
        <div class="panel">
            <h3 class="mb-3">AI Search Agent Terminal</h3>
            <div class="terminal-shell p-4 mb-4">
                <div class="d-flex align-items-center gap-2 mb-3 border-bottom border-secondary pb-2">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <small class="text-secondary ms-2" style="font-family: monospace;">ai_search_agent.py --skill="${selectedSkill}" --diff="${selectedDifficulty}"</small>
                </div>
                <pre id="terminalLogs" class="m-0"></pre>
            </div>
        </div>`;

    fetchQuestionAndRunLogs();
}

async function fetchQuestionAndRunLogs() {
    const term = document.getElementById("terminalLogs");
    term.innerHTML = "> Connecting to AI Practice Orchestrator...\n";

    try {
        // Fetch question from backend
        const response = await api(`/practice/search?skill=${encodeURIComponent(selectedSkill)}&difficulty=${selectedDifficulty}`);
        
        if (!response || !response.question) {
            throw new Error("No question returned from server");
        }

        currentQuestion = response.question;
        const searchLogs = response.logs || [];

        // Run log typing animation
        let logIndex = 0;
        function typeLog() {
            if (logIndex < searchLogs.length) {
                term.innerHTML += `> ${searchLogs[logIndex]}\n`;
                term.scrollTop = term.scrollHeight;
                logIndex++;
                setTimeout(typeLog, 400); // 400ms delay per log line
            } else {
                term.innerHTML += `> [SUCCESS] Synthesis complete. Loading quiz workspace...\n`;
                setTimeout(() => {
                    renderQuestionPlayer();
                }, 800);
            }
        }
        
        setTimeout(typeLog, 400);

    } catch (err) {
        console.error(err);
        term.innerHTML += `\n> [ERROR] Search Agent failed to scrape. Reconnecting...\n`;
        term.innerHTML += `> Details: ${err.message}\n`;
        term.innerHTML += `> Please try again.\n`;
        page.innerHTML += `
            <div class="text-center mt-3">
                <button class="btn btn-primary" onclick="renderSelection()">Back to Setup</button>
            </div>`;
    }
}

function renderQuestionPlayer() {
    selectedOption = null;

    page.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="panel">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge text-bg-primary">${currentQuestion.category}</span>
                        <span class="badge text-bg-secondary">${currentQuestion.difficulty}</span>
                    </div>
                    
                    <h4 class="mb-4">${currentQuestion.question}</h4>
                    
                    <div class="options-container mb-4">
                        ${currentQuestion.options.map((opt, idx) => `
                            <div class="option-card p-3 mb-3 rounded" onclick="selectOption(${idx})" id="opt-${idx}">
                                <div class="d-flex align-items-center">
                                    <span class="option-badge me-3 bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px; font-weight: bold;" id="opt-badge-${idx}">
                                        ${String.fromCharCode(65 + idx)}
                                    </span>
                                    <span class="option-text">${opt}</span>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    
                    <div id="feedbackContainer" class="mb-4 d-none"></div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-lg px-4" id="submitBtn" onclick="submitAnswer()" disabled>
                            Submit Answer
                        </button>
                        <button class="btn btn-outline-secondary btn-lg px-4 d-none" id="nextBtn" onclick="launchAgent()">
                            Next Challenge ➡️
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="panel h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="mb-3">Focus Topic</h4>
                        <div class="card bg-body-tertiary border-0 p-3 mb-4">
                            <strong>${selectedSkill}</strong>
                            <small class="text-secondary">Level: ${selectedDifficulty}</small>
                        </div>
                        
                        <h5>Progress Indicators</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Streak:</span>
                            <span class="badge bg-warning text-dark">${streak} 🔥</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Accuracy:</span>
                            <strong>${totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0}%</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-secondary">Questions Played:</span>
                            <strong>${totalAttempts}</strong>
                        </div>
                    </div>
                    
                    <button class="btn btn-outline-secondary w-100 mt-4" onclick="renderSelection()">
                        Quit & Go Back
                    </button>
                </div>
            </div>
        </div>`;
}

function selectOption(index) {
    if (document.getElementById("submitBtn").disabled && document.getElementById("submitBtn").classList.contains("d-none")) {
        return; // Already submitted
    }
    
    // Clear previous selection
    currentQuestion.options.forEach((_, idx) => {
        const el = document.getElementById(`opt-${idx}`);
        el.classList.remove("selected");
        const badge = document.getElementById(`opt-badge-${idx}`);
        badge.classList.remove("bg-primary");
        badge.classList.add("bg-secondary");
    });
    
    // Set new selection
    selectedOption = index;
    const activeCard = document.getElementById(`opt-${index}`);
    activeCard.classList.add("selected");
    const activeBadge = document.getElementById(`opt-badge-${index}`);
    activeBadge.classList.remove("bg-secondary");
    activeBadge.classList.add("bg-primary");
    
    document.getElementById("submitBtn").removeAttribute("disabled");
}

async function submitAnswer() {
    const submitBtn = document.getElementById("submitBtn");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedbackContainer");
    
    submitBtn.classList.add("d-none");
    nextBtn.classList.remove("d-none");
    
    const selectedText = currentQuestion.options[selectedOption];
    const isCorrect = (selectedText === currentQuestion.answer);
    
    totalAttempts++;
    completedCount++;
    
    // Color option cards
    currentQuestion.options.forEach((opt, idx) => {
        const card = document.getElementById(`opt-${idx}`);
        const badge = document.getElementById(`opt-badge-${idx}`);
        
        card.classList.remove("selected");
        badge.classList.remove("bg-primary");
        
        if (opt === currentQuestion.answer) {
            card.classList.add("correct");
            badge.classList.remove("bg-secondary");
            badge.classList.add("bg-success");
        } else if (idx === selectedOption && !isCorrect) {
            card.classList.add("incorrect");
            badge.classList.remove("bg-secondary");
            badge.classList.add("bg-danger");
        }
    });
    
    if (isCorrect) {
        streak++;
        correctAttempts++;
        feedback.innerHTML = `
            <div class="alert alert-success d-flex align-items-center gap-3 py-3" role="alert">
                <span style="font-size: 1.5rem;">🎉</span>
                <div>
                    <strong>Correct!</strong> Your skill proficiency score has been updated (+3 pts).
                </div>
            </div>`;
            
        // Post activity to backend
        try {
            await api("/practice/submit", {
                method: "POST",
                body: JSON.stringify({
                    lessonId: currentQuestion.id,
                    skill: selectedSkill,
                    difficulty: selectedDifficulty
                })
            });
        } catch (e) {
            console.error("Failed to submit progress:", e);
        }
    } else {
        streak = 0;
        feedback.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center gap-3 py-3" role="alert">
                <span style="font-size: 1.5rem;">❌</span>
                <div>
                    <strong>Incorrect.</strong> See correct solution below.
                </div>
            </div>`;
    }
    
    // Render explanation
    feedback.innerHTML += `
        <div class="card bg-body-tertiary border-0 p-3 mt-3">
            <strong>Explanation:</strong>
            <p class="m-0 mt-1 text-secondary">${currentQuestion.explanation}</p>
        </div>`;
        
    feedback.classList.remove("d-none");
    saveStats();
}

function resetStats() {
    if (confirm("Are you sure you want to reset all your Practice Hub statistics and progress?")) {
        streak = 0;
        completedCount = 0;
        totalAttempts = 0;
        correctAttempts = 0;
        saveStats();
        renderSelection();
    }
}

// Start
load();
