package com.backend.service;

import com.backend.model.UserDataMapper;
import com.backend.model.db.UserData;
import com.backend.model.dto.UserDataDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserService {
    private final UserRepo userRepo;

    private final ModelService modelService;

    private final UserDataMapper userDataMapper;

    public Mono<PaymentMethod> getPrediction(String clientId) {
        return userRepo.findByClientId(clientId)
                .flatMap(user -> {
                    if (user.getTarget() != null) {
                        return Mono.just(user.getTarget());
                    }
                    return addPrediction(clientId);
                });
    }

    public Mono<PaymentMethod> addPrediction(String clientId) {
        return userRepo.findByClientId(clientId)
                .map(userDataMapper::toDTO)
                .flatMap(user -> modelService.classify(userDataMapper.toModelRequest(user))
                        .map(prediction -> {
                            user.setTarget(prediction);
                            return userDataMapper.toEntity(user);
                        })
                )
                .flatMap(userRepo::save)
                .map(UserData::getTarget);
    }

    public void addUser(UserDataDTO userData) {
        UserData user = userDataMapper.toEntity(userData);
        userRepo.save(user).subscribe();
    }
}
