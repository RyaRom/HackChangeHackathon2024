package com.backend.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignatureDTO {
    private Long id;

    private Integer mobile;

    private Integer web;
}
