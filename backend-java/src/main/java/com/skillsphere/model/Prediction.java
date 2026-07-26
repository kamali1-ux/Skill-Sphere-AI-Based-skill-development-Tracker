package com.skillsphere.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "predictions")
public class Prediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    private Double readinessScore;
    private Double skillGrowthPrediction;
    private String careerSuggestion;
    @Column(length = 1000)
    private String recommendedSkills;
    private LocalDateTime predictionDate = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Double getReadinessScore() { return readinessScore; }
    public void setReadinessScore(Double readinessScore) { this.readinessScore = readinessScore; }
    public Double getSkillGrowthPrediction() { return skillGrowthPrediction; }
    public void setSkillGrowthPrediction(Double skillGrowthPrediction) { this.skillGrowthPrediction = skillGrowthPrediction; }
    public String getCareerSuggestion() { return careerSuggestion; }
    public void setCareerSuggestion(String careerSuggestion) { this.careerSuggestion = careerSuggestion; }
    public String getRecommendedSkills() { return recommendedSkills; }
    public void setRecommendedSkills(String recommendedSkills) { this.recommendedSkills = recommendedSkills; }
    public LocalDateTime getPredictionDate() { return predictionDate; }
    public void setPredictionDate(LocalDateTime predictionDate) { this.predictionDate = predictionDate; }
}
