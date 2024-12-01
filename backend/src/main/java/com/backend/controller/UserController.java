package com.backend.controller;

import com.backend.model.dto.WebRequestDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "User", description = "User API")
public class UserController {
    private final UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get classification", description = "Get classification from bd or update if null")
    @PostMapping("/classify")
    public ResponseEntity<PaymentMethod> getClassification(@RequestBody WebRequestDTO webRequestDTO) {
        var method = userService.getPrediction(webRequestDTO);
        return ResponseEntity.ok(method);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Add prediction", description = "Add prediction to bd")
    @PostMapping("/predict")
    public ResponseEntity<PaymentMethod> addPrediction(@RequestBody WebRequestDTO webRequestDTO) {
        var method = userService.addPrediction(webRequestDTO);
        return ResponseEntity.ok(method);
    }
}
