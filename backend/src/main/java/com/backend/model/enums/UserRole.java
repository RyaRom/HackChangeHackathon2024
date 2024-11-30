package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum UserRole {
    @JsonProperty("ЕИО") USER,
    @JsonProperty("Сотрудник") STAFF,
}
