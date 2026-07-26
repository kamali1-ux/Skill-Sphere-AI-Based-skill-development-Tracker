package com.skillsphere.controller;

import com.skillsphere.model.User;
import com.skillsphere.repository.UserRepository;
import com.skillsphere.service.CurrentUserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final CurrentUserService currentUserService;
    private final UserRepository userRepository;

    public ProfileController(CurrentUserService currentUserService, UserRepository userRepository) {
        this.currentUserService = currentUserService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public User getProfile() {
        return currentUserService.user();
    }

    @PutMapping
    public User updateProfile(@RequestBody User update) {
        User user = currentUserService.user();
        user.setName(update.getName());
        user.setPhone(update.getPhone());
        user.setEducation(update.getEducation());
        user.setCareerInterest(update.getCareerInterest());
        return userRepository.save(user);
    }
}
