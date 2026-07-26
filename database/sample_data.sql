USE skillsphere_db;

INSERT INTO users (name, email, password, role, education, career_interest)
VALUES ('Demo Student', 'demo@skillsphere.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', 'B.Tech Computer Science', 'Full Stack Developer');

SET @demo_user_id = LAST_INSERT_ID();

INSERT INTO skills (user_id, skill_name, category, proficiency_level, proficiency_score) VALUES
(@demo_user_id, 'Java', 'Programming', 'Advanced', 75),
(@demo_user_id, 'Spring Boot', 'Programming', 'Intermediate', 50),
(@demo_user_id, 'SQL', 'Data Science', 'Intermediate', 50),
(@demo_user_id, 'Communication', 'Communication', 'Advanced', 75);

INSERT INTO goals (user_id, goal_name, target_date, progress_percentage, completed) VALUES
(@demo_user_id, 'Complete Spring Boot REST API course', '2026-07-20', 65, FALSE),
(@demo_user_id, 'Build portfolio project', '2026-08-15', 40, FALSE),
(@demo_user_id, 'Earn SQL certification', '2026-06-30', 100, TRUE);

INSERT INTO learning_activities (user_id, activity_type, title, hours_spent, completion_date) VALUES
(@demo_user_id, 'Course', 'Spring Boot API Development', 28, '2026-04-10'),
(@demo_user_id, 'Certification', 'SQL Associate Certificate', 16, '2026-05-02'),
(@demo_user_id, 'Practice', 'REST API practice', 22, '2026-05-16'),
(@demo_user_id, 'Project', 'SkillSphere prototype', 34, '2026-06-01');
