package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PaymentMethod {
    @JsonProperty("SMS") SMS("SMS"),
    @JsonProperty("PayControl") PAY_CONTROL("PayControl"),
    @JsonProperty("КЭП на токене") TOKEN("КЭП на токене"),
    @JsonProperty("КЭП в приложении") APP("КЭП в приложении");

    private final String title;
}
