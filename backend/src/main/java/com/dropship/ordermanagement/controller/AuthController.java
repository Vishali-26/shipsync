package com.dropship.ordermanagement.controller;

import com.dropship.ordermanagement.model.User;
import com.dropship.ordermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    // Register new user
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Set default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("CUSTOMER");
        }
        return userRepository.save(user);
    }
    
    // Alternative signup endpoint (same as register)
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return register(user);
    }
    
    // Login user
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return user.get();
        }
        return null; // Login failed
    }
    
    // Alternative signin endpoint (same as login)
    @PostMapping("/signin")
    public User signin(@RequestBody User loginRequest) {
        return login(loginRequest);
    }
    
    // Get current user info (placeholder - in real app would use JWT token)
    @GetMapping("/me")
    public User getCurrentUser(@RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }
}
