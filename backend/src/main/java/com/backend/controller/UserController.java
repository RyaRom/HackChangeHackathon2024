package com.backend.controller;

import com.backend.model.dto.UserDataDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/classify/{clientId}")
    public ResponseEntity<PaymentMethod> getClassification(@PathVariable String clientId) {
        return ResponseEntity.ok(userService.getPrediction(clientId));
    }

    @PostMapping("/predict/{clientId}")
    public ResponseEntity<PaymentMethod> addPrediction(@PathVariable String clientId) {
        return ResponseEntity.ok(userService.addPrediction(clientId));
    }

    @PostMapping("/user/add")
    public ResponseEntity<Void> addUser(@RequestBody UserDataDTO userData) {
        userService.addUser(userData);
        return ResponseEntity.ok().build();
    }
}
