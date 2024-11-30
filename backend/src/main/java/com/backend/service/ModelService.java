package com.backend.service;


import com.backend.model.dto.ModelRequestDTO;
import com.backend.model.enums.PaymentMethod;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Log4j2
@RequiredArgsConstructor
public class ModelService {
    private final WebClient webClient;

    @Value("${model.url}")
    private String url;

    public PaymentMethod classify(ModelRequestDTO modelRequestDTO) {
        log.info("Sending {} to the model", modelRequestDTO.toString());
//        ModelResponseDTO response = null;
//        try {
//            response = webClient.post()
//                    .uri(url)
//                    .bodyValue(modelRequestDTO)
//                    .retrieve()
//                    .bodyToMono(ModelResponseDTO.class)
//                    .block();
//        } catch (Exception e) {
//            throw new ModelException();
//        }
//
//        if (response == null || Boolean.TRUE.equals(response.getIsError())) {
//            throw new ModelException();
//        }
//
//        return response.getPaymentMethod();
        return PaymentMethod.PAY_CONTROL;
    }
}
