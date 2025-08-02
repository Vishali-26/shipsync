package com.dropship.ordermanagement.controller;

import com.dropship.ordermanagement.model.User;
import com.dropship.ordermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.onrender.com", "https://*.railway.app"})
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
   
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("CUSTOMER");
        }
        return userRepository.save(user);
    }
    
    
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return register(user);
    }
    
 
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return user.get();
        }
        return null;
    }
    
    
    @PostMapping("/signin")
    public User signin(@RequestBody User loginRequest) {
        return login(loginRequest);
    }
    
   
    @GetMapping("/me")
    public User getCurrentUser(@RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }
}
