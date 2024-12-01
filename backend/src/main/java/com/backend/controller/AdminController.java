package com.backend.controller;

import com.backend.model.db.UserData;
import com.backend.model.dto.UserDataDTO;
import com.backend.model.dto.WebRequestDTO;
import com.backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin API")
public class AdminController {
    private final UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user/add")
    public ResponseEntity<Void> addUser(@RequestBody UserDataDTO userData) {
        userService.addUser(userData);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user")
    public ResponseEntity<UserData> getUser(@RequestBody WebRequestDTO webRequestDTO) {
        UserData user = userService.getUser(webRequestDTO);
        return ResponseEntity.ok(user);
    }
}
