package com.backend.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignaturesDTO {
    private SignatureDTO common;

    private SignatureDTO special;
}