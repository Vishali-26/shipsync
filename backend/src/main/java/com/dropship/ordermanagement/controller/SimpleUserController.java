package com.dropship.ordermanagement.controller;

import com.dropship.ordermanagement.model.User;
import com.dropship.ordermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class SimpleUserController {
    
    @Autowired
    private UserRepository userRepository;
    
   
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
   
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }
    
    
    @PostMapping
    public User createUser(@RequestBody User user) {
       
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("CUSTOMER");
        }
        return userRepository.save(user);
    }

   
    @PostMapping("/admin")
    public User createAdmin(@RequestBody User user) {
        user.setRole("ADMIN");
        return userRepository.save(user);
    }
    
   
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return user.get();
        }
        return null;
    }
    
    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }
        return null;
    }
    
    
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
