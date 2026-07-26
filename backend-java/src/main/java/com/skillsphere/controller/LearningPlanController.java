package com.skillsphere.controller;

import com.skillsphere.dto.LearningPlanItem;
import com.skillsphere.model.Goal;
import com.skillsphere.model.Skill;
import com.skillsphere.repository.GoalRepository;
import com.skillsphere.repository.SkillRepository;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/learning-plan")
public class LearningPlanController {
    private final CurrentUserService currentUserService;
    private final SkillRepository skillRepository;
    private final GoalRepository goalRepository;

    public LearningPlanController(CurrentUserService currentUserService, SkillRepository skillRepository, GoalRepository goalRepository) {
        this.currentUserService = currentUserService;
        this.skillRepository = skillRepository;
        this.goalRepository = goalRepository;
    }

    @GetMapping
    public List<LearningPlanItem> weeklyPlan() {
        Long userId = currentUserService.user().getId();
        Skill weakest = skillRepository.findByUserId(userId).stream()
                .min(Comparator.comparing(skill -> skill.getProficiencyScore() == null ? 0 : skill.getProficiencyScore()))
                .orElse(null);
        Goal goal = goalRepository.findByUserId(userId).stream()
                .filter(item -> !item.isCompleted())
                .findFirst()
                .orElse(null);

        String focusTitle = weakest == null ? "Add a new skill" : "Improve " + weakest.getSkillName();
        String focusDescription = weakest == null
                ? "Create your first skill entry and choose a proficiency level."
                : "Practice one focused topic and move beyond " + weakest.getProficiencyLevel() + " level.";
        String goalTitle = goal == null ? "Set a learning goal" : "Goal progress: " + goal.getGoalName();
        String goalDescription = goal == null
                ? "Create a short-term goal with a realistic target date."
                : "Push this goal from " + goal.getProgressPercentage() + "% toward completion.";

        return List.of(
                new LearningPlanItem("Mon", focusTitle, focusDescription, "60 min", false),
                new LearningPlanItem("Tue", goalTitle, goalDescription, "45 min", false),
                new LearningPlanItem("Wed", "Project practice", "Convert learning into a portfolio-ready project feature.", "60 min", false),
                new LearningPlanItem("Thu", "Analytics review", "Check your dashboard and log one activity.", "30 min", false),
                new LearningPlanItem("Fri", "AI recommendation review", "Run prediction and note the next skills to learn.", "30 min", false)
        );
    }
}
