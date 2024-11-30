package com.backend.controller;

import com.backend.model.dto.UserDataDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/classify/{clientId}")
    public Mono<PaymentMethod> getClassification(@PathVariable String clientId) {
        return userService.getPrediction(clientId);
    }

    @PostMapping("/predict/{clientId}")
    public Mono<PaymentMethod> addPrediction(@PathVariable String clientId) {
        return userService.addPrediction(clientId);
    }

    @PostMapping("/user/add")
    public ResponseEntity<Void> addUser(@RequestBody UserDataDTO userData) {
        userService.addUser(userData);
        return ResponseEntity.ok().build();
    }
}
