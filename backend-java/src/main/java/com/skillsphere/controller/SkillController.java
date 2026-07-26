package com.skillsphere.controller;

import com.skillsphere.model.Skill;
import com.skillsphere.model.User;
import com.skillsphere.repository.SkillRepository;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {
    private final SkillRepository skillRepository;
    private final CurrentUserService currentUserService;

    public SkillController(SkillRepository skillRepository, CurrentUserService currentUserService) {
        this.skillRepository = skillRepository;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Skill> all() {
        return skillRepository.findByUserId(currentUserService.user().getId());
    }

    @PostMapping
    public Skill create(@RequestBody Skill skill) {
        skill.setUser(currentUserService.user());
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public Skill update(@PathVariable Long id, @RequestBody Skill update) {
        User user = currentUserService.user();
        Skill skill = skillRepository.findById(id).orElseThrow();
        if (!skill.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        skill.setSkillName(update.getSkillName());
        skill.setCategory(update.getCategory());
        skill.setProficiencyLevel(update.getProficiencyLevel());
        skill.setProficiencyScore(update.getProficiencyScore());
        return skillRepository.save(skill);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        User user = currentUserService.user();
        Skill skill = skillRepository.findById(id).orElseThrow();
        if (!skill.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        skillRepository.delete(skill);
    }
}
