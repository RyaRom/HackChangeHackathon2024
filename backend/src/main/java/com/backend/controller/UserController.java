package com.backend.controller;

import com.backend.model.dto.WebRequestDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "User", description = "User API")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Get classification", description = "Get classification from bd or update if null")
    @PostMapping("/classify")
    public ResponseEntity<PaymentMethod> getClassification(@RequestBody WebRequestDTO webRequestDTO) {
        return ResponseEntity.ok(userService.getPrediction(webRequestDTO));
    }

    @Operation(summary = "Add prediction", description = "Add prediction to bd")
    @PostMapping("/predict")
    public ResponseEntity<PaymentMethod> addPrediction(@RequestBody WebRequestDTO webRequestDTO) {
        return ResponseEntity.ok(userService.addPrediction(webRequestDTO));
    }
}
