package com.backend.model.db;

import com.backend.model.enums.PaymentMethod;
import com.backend.model.enums.SegmentType;
import com.backend.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserData {
    @Id
    @Column(name = "client_id", nullable = false)
    private String clientId;

    private String organizationId;

    @Enumerated(EnumType.STRING)
    private SegmentType segment;

    private Integer organizations;

    @Enumerated(EnumType.STRING)
    private PaymentMethod currentMethod;

    private Boolean mobileApp;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "signatures_id")
    private Signatures signatures;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = PaymentMethod.class)
    @CollectionTable(name = "available_methods", joinColumns = @JoinColumn(name = "client_id"))
    private List<PaymentMethod> availableMethods;

    private Integer claims;

    private PaymentMethod target;
}