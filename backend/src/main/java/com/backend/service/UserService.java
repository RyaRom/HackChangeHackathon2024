package com.backend.service;

import com.backend.model.UserDataMapper;
import com.backend.model.db.UserData;
import com.backend.model.dto.UserDataDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    private final UserDataMapper userDataMapper;

    private final ModelService modelService;

    public PaymentMethod getPrediction(String clientId) {
        UserData user = userRepo.findByClientId(clientId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getTarget() != null) {
            return user.getTarget();
        } else {
            return addPrediction(clientId);
        }
    }

    public PaymentMethod addPrediction(String clientId) {
        UserData user = userRepo.findByClientId(clientId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserDataDTO userDataDTO = userDataMapper.toDTO(user);
        PaymentMethod method = modelService.classify(userDataMapper.toModelRequest(userDataDTO));
        userDataDTO.setTarget(method);
        userRepo.save(userDataMapper.toEntity(userDataDTO));
        return method;
    }

    public void addUser(UserDataDTO userData) {
        UserData user = userDataMapper.toEntity(userData);
        userRepo.save(user);
    }
}
