package com.backend.model.db;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Signatures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signatures_id")
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "mobile", column = @Column(name = "common_mobile")),
            @AttributeOverride(name = "web", column = @Column(name = "common_web"))
    })
    private Signature common;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "mobile", column = @Column(name = "special_mobile")),
            @AttributeOverride(name = "web", column = @Column(name = "special_web"))
    })
    private Signature special;
}
