package com.skillsphere.dto;

import java.util.List;

public record PredictionResponse(
        double readinessScore,
        double skillGrowthPrediction,
        String careerSuggestion,
        List<String> recommendedSkills
) {}
