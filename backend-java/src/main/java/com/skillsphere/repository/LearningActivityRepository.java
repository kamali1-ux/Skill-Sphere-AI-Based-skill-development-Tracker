package com.skillsphere.repository;

import com.skillsphere.model.LearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningActivityRepository extends JpaRepository<LearningActivity, Long> {
    List<LearningActivity> findByUserId(Long userId);
}
