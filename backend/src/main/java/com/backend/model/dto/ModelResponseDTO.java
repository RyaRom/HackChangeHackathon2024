package com.backend.model.dto;

import com.backend.model.enums.PaymentMethod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelResponseDTO {
    private Boolean isError;

    private String paymentMethod;
}
