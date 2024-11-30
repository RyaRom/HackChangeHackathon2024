package com.backend.controller;

import com.backend.model.dto.UserDataDTO;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    @PostMapping("/user/add")
    public ResponseEntity<Void> addUser(@RequestBody UserDataDTO userData) {
        userService.addUser(userData);
        return ResponseEntity.ok().build();
    }
}
