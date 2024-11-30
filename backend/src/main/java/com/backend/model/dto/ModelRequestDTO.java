package com.backend.model.dto;

import com.backend.model.enums.PaymentMethod;
import com.backend.model.enums.SegmentType;
import com.backend.model.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModelRequestDTO {
    private SegmentType segment;

    private Integer organizations;

    private PaymentMethod currentMethod;

    private Boolean mobileApp;

    private Integer commonMobile;

    private Integer commonWeb;

    private Integer specialMobile;

    private Integer specialWeb;

    UserRole role;

    private List<PaymentMethod> availableMethods;

    private Integer claims;

    private PaymentMethod target;
}
