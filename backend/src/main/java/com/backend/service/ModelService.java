package com.backend.service;


import com.backend.exception.ModelException;
import com.backend.model.dto.ModelRequestDTO;
import com.backend.model.dto.ModelResponseDTO;
import com.backend.model.enums.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final WebClient webClient;

    @Value("${model.url}")
    private String url;

    public PaymentMethod classify(ModelRequestDTO modelRequestDTO) {
        ModelResponseDTO response = webClient.post()
                .uri(url)
                .retrieve()
                .bodyToMono(ModelResponseDTO.class)
                .block();

        if (response == null || Boolean.TRUE.equals(response.getIsError())) {
            throw new ModelException();
        }

        return response.getPaymentMethod();
    }
}
