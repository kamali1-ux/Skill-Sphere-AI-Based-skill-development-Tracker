package com.skillsphere.dto;

public record PredictionRequest(
        Long userId,
        long skillCount,
        double learningHours,
        long certifications,
        long projectsCompleted,
        double proficiencyScore
) {}
