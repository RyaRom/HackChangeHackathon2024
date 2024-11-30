package com.backend.service;

import com.backend.model.UserDataMapper;
import com.backend.model.db.UserData;
import com.backend.model.dto.UserDataDTO;
import com.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final UserDataMapper userDataMapper;

    public void addPrediction(String clientId) {
        UserData user = userRepo.findByClientId(clientId);
    }

    public void addUser(UserDataDTO userData) {
        UserData user = userDataMapper.toEntity(userData);
        userRepo.save(user);
    }
}
