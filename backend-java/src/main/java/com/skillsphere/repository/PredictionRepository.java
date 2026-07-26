package com.skillsphere.repository;

import com.skillsphere.model.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    List<Prediction> findByUserIdOrderByPredictionDateDesc(Long userId);
}
