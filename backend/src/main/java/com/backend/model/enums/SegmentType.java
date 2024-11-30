package com.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum SegmentType {
    @JsonProperty("Малый бизнес") SMALL,
    @JsonProperty("Средний бизнес") MIDDLE,
    @JsonProperty("Крупный бизнес") LARGE
}
