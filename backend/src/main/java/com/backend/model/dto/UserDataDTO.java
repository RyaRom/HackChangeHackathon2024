package com.backend.model.dto;

import com.backend.model.enums.PaymentMethod;
import com.backend.model.enums.SegmentType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserDataDTO {
    private String clientId;

    private String organizationId;

    private SegmentType segment;

    private Integer organizations;

    private PaymentMethod currentMethod;

    private Boolean mobileApp;

    private SignaturesDTO signatures;

    private List<PaymentMethod> availableMethods;

    private Integer claims;

    private PaymentMethod target;
}
