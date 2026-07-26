package com.skillsphere.controller;

import com.skillsphere.dto.PredictionRequest;
import com.skillsphere.dto.PredictionResponse;
import com.skillsphere.model.LearningActivity;
import com.skillsphere.model.Prediction;
import com.skillsphere.model.Skill;
import com.skillsphere.model.User;
import com.skillsphere.repository.LearningActivityRepository;
import com.skillsphere.repository.PredictionRepository;
import com.skillsphere.repository.SkillRepository;
import com.skillsphere.service.AiPredictionService;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PredictionController {
    private final CurrentUserService currentUserService;
    private final SkillRepository skillRepository;
    private final LearningActivityRepository activityRepository;
    private final PredictionRepository predictionRepository;
    private final AiPredictionService aiPredictionService;

    public PredictionController(CurrentUserService currentUserService, SkillRepository skillRepository,
                                LearningActivityRepository activityRepository, PredictionRepository predictionRepository,
                                AiPredictionService aiPredictionService) {
        this.currentUserService = currentUserService;
        this.skillRepository = skillRepository;
        this.activityRepository = activityRepository;
        this.predictionRepository = predictionRepository;
        this.aiPredictionService = aiPredictionService;
    }

    @PostMapping("/predict")
    public Prediction predict() {
        User user = currentUserService.user();
        List<Skill> skills = skillRepository.findByUserId(user.getId());
        List<LearningActivity> activities = activityRepository.findByUserId(user.getId());
        double hours = activities.stream().mapToDouble(a -> a.getHoursSpent() == null ? 0 : a.getHoursSpent()).sum();
        long certifications = activities.stream().filter(a -> "Certification".equalsIgnoreCase(a.getActivityType())).count();
        long projects = activities.stream().filter(a -> "Project".equalsIgnoreCase(a.getActivityType())).count();
        double proficiency = skills.stream().mapToInt(s -> s.getProficiencyScore() == null ? 25 : s.getProficiencyScore()).average().orElse(25);

        PredictionResponse response = aiPredictionService.predict(new PredictionRequest(
                user.getId(), skills.size(), hours, certifications, projects, proficiency
        ));

        Prediction prediction = new Prediction();
        prediction.setUser(user);
        prediction.setReadinessScore(response.readinessScore());
        prediction.setSkillGrowthPrediction(response.skillGrowthPrediction());
        prediction.setCareerSuggestion(response.careerSuggestion());
        prediction.setRecommendedSkills(String.join(", ", response.recommendedSkills()));
        return predictionRepository.save(prediction);
    }

    @GetMapping("/predictions")
    public List<Prediction> predictions() {
        return predictionRepository.findByUserIdOrderByPredictionDateDesc(currentUserService.user().getId());
    }
}
