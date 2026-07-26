CREATE DATABASE IF NOT EXISTS skillsphere_db;
USE skillsphere_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(40) DEFAULT 'USER',
    phone VARCHAR(40),
    education VARCHAR(160),
    career_interest VARCHAR(160)
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    skill_name VARCHAR(120) NOT NULL,
    category VARCHAR(80) NOT NULL,
    proficiency_level VARCHAR(40) NOT NULL,
    proficiency_score INT DEFAULT 25,
    CONSTRAINT fk_skills_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS goals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    goal_name VARCHAR(180) NOT NULL,
    target_date DATE NOT NULL,
    progress_percentage INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_goals_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_activities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    activity_type VARCHAR(80) NOT NULL,
    title VARCHAR(180),
    hours_spent DOUBLE DEFAULT 0,
    completion_date DATE,
    CONSTRAINT fk_activities_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS predictions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    readiness_score DOUBLE,
    skill_growth_prediction DOUBLE,
    career_suggestion VARCHAR(120),
    recommended_skills VARCHAR(1000),
    prediction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_predictions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_plan_notes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    plan_title VARCHAR(180) NOT NULL,
    plan_note VARCHAR(500),
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_plan_notes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
