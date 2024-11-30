package com.backend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "Web request", description = "Request of prediction from some context")
public class WebRequestDTO {
    @Schema(title = "Client id", description = "Id of client", required = true)
    String clientId;

    @Schema(title = "Organization id", description = "Id of organization", required = true)
    String organizationId;

    @Schema(title = "Context", description = "Context of request")
    String context;
}
