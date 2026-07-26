package com.skillsphere.controller;

import com.skillsphere.model.Goal;
import com.skillsphere.model.User;
import com.skillsphere.repository.GoalRepository;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {
    private final GoalRepository goalRepository;
    private final CurrentUserService currentUserService;

    public GoalController(GoalRepository goalRepository, CurrentUserService currentUserService) {
        this.goalRepository = goalRepository;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Goal> all() {
        return goalRepository.findByUserId(currentUserService.user().getId());
    }

    @PostMapping
    public Goal create(@RequestBody Goal goal) {
        goal.setUser(currentUserService.user());
        goal.setCompleted(goal.getProgressPercentage() != null && goal.getProgressPercentage() >= 100);
        return goalRepository.save(goal);
    }

    @PutMapping("/{id}")
    public Goal update(@PathVariable Long id, @RequestBody Goal update) {
        User user = currentUserService.user();
        Goal goal = goalRepository.findById(id).orElseThrow();
        if (!goal.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        goal.setGoalName(update.getGoalName());
        goal.setTargetDate(update.getTargetDate());
        goal.setProgressPercentage(update.getProgressPercentage());
        goal.setCompleted(update.isCompleted() || update.getProgressPercentage() >= 100);
        return goalRepository.save(goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        User user = currentUserService.user();
        Goal goal = goalRepository.findById(id).orElseThrow();
        if (!goal.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        goalRepository.delete(goal);
    }
}
