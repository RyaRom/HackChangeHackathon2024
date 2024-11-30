package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    @JsonProperty("ЕИО") USER("ЕИО"),
    @JsonProperty("Сотрудник") STAFF("Сотрудник");

    private final String title;
}
