package com.backend.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WebRequestDTO {
    String clientId;

    String organizationId;

    String context;
}
