package com.backend.controller;

import com.backend.model.dto.WebRequestDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/classify")
    public ResponseEntity<PaymentMethod> getClassification(@RequestBody WebRequestDTO webRequestDTO) {
        return ResponseEntity.ok(userService.getPrediction(webRequestDTO));
    }

    @PostMapping("/predict")
    public ResponseEntity<PaymentMethod> addPrediction(@RequestBody WebRequestDTO webRequestDTO) {
        return ResponseEntity.ok(userService.addPrediction(webRequestDTO));
    }
}
