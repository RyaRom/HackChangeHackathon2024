package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentMethod {
    @JsonProperty("SMS") SMS,
    @JsonProperty("PayControl") PAY_CONTROL,
    @JsonProperty("КЭП на токене") TOKEN,
    @JsonProperty("КЭП в приложении") APP
}
