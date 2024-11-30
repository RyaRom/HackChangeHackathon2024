package com.backend.model.dto;

import com.backend.model.enums.PaymentMethod;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ModelResponseDTO {
    private Boolean isError;
    private PaymentMethod paymentMethod;
}
