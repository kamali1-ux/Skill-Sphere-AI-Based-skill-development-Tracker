package com.skillsphere.controller;

import com.skillsphere.model.LearningActivity;
import com.skillsphere.repository.LearningActivityRepository;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final LearningActivityRepository activityRepository;
    private final CurrentUserService currentUserService;

    public ActivityController(LearningActivityRepository activityRepository, CurrentUserService currentUserService) {
        this.activityRepository = activityRepository;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<LearningActivity> all() {
        return activityRepository.findByUserId(currentUserService.user().getId());
    }

    @PostMapping
    public LearningActivity create(@RequestBody LearningActivity activity) {
        activity.setUser(currentUserService.user());
        return activityRepository.save(activity);
    }
}
