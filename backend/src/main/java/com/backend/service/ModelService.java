package com.backend.service;

import com.backend.exception.ModelException;
import com.backend.model.dto.ModelRequestDTO;
import com.backend.model.enums.PaymentMethod;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Log4j2
@RequiredArgsConstructor
public class ModelService {
    private final WebClient webClient;

    @Value("${model.endpoint}")
    private String modelUrl;

    public Mono<PaymentMethod> classify(ModelRequestDTO modelRequestDTO) {
        return webClient.post()
                .uri(modelUrl)
                .bodyValue(modelRequestDTO)
                .retrieve()
                .bodyToMono(PaymentMethod.class)
                .onErrorMap(e -> {
                    log.error("Error while calling model: {}", e.getMessage());
                    return new ModelException();
                });

    }
}
