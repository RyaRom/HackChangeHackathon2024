package com.backend.service;

import com.backend.model.UserDataMapper;
import com.backend.model.db.UserData;
import com.backend.model.dto.UserDataDTO;
import com.backend.model.dto.WebRequestDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    private final UserDataMapper userDataMapper;

    private final ModelService modelService;

    @Transactional
    public PaymentMethod getPrediction(WebRequestDTO webRequestDTO) {
        UserData user = getUser(webRequestDTO);
        if (user.getTarget() != null) {
            return user.getTarget();
        } else {
            return addPrediction(webRequestDTO);
        }
    }

    @Transactional
    public PaymentMethod addPrediction(WebRequestDTO webRequestDTO) {
        UserData user = getUser(webRequestDTO);
        UserDataDTO userDataDTO = userDataMapper.toDTO(user);
        PaymentMethod method = modelService.classify(userDataMapper.toModelRequest(userDataDTO));
        userDataDTO.setTarget(method);
        addUser(userDataDTO);
        return method;
    }

    @Transactional
    public void addUser(UserDataDTO userData) {
        UserData user = userDataMapper.toEntity(userData);
        userRepo.save(user);
    }

    public UserData getUser(WebRequestDTO webRequestDTO) {
        return userRepo.findDistinctByClientIdAndOrganizationId(
                        webRequestDTO.getClientId(),
                        webRequestDTO.getOrganizationId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
