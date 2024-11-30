package com.backend.controller;

import com.backend.model.dto.UserDataDTO;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/classify/{id}")
    public ResponseEntity<Void> getClassification(@PathVariable String clientId) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/predict/{id}")
    public ResponseEntity<Void> addPrediction(@PathVariable String clientId) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/add")
    public ResponseEntity<Void> addUser(@RequestBody UserDataDTO userData) {
        userService.addUser(userData);
        return ResponseEntity.ok().build();
    }
}
