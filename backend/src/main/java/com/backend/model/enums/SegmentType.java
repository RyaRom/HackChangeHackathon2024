package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum SegmentType {
    @JsonProperty("Малый бизнес") SMALL("Малый бизнес"),
    @JsonProperty("Средний бизнес") MIDDLE("Средний бизнес"),
    @JsonProperty("Крупный бизнес") LARGE("Крупный бизнес");

    private final String title;
}
