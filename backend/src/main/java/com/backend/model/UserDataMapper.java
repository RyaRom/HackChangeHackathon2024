package com.backend.model;

import com.backend.model.db.Signature;
import com.backend.model.db.Signatures;
import com.backend.model.db.UserData;
import com.backend.model.dto.ModelRequestDTO;
import com.backend.model.dto.SignatureDTO;
import com.backend.model.dto.SignaturesDTO;
import com.backend.model.dto.UserDataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDataMapper {
    public UserDataDTO toDTO(UserData userData) {
        if (userData == null) {
            return null;
        }

        return UserDataDTO.builder()
                .clientId(userData.getClientId())
                .organizationId(userData.getOrganizationId())
                .segment(userData.getSegment())
                .organizations(userData.getOrganizations())
                .currentMethod(userData.getCurrentMethod())
                .mobileApp(userData.getMobileApp())
                .signatures(toDTO(userData.getSignatures()))
                .role(userData.getRole())
                .availableMethods(userData.getAvailableMethods())
                .claims(userData.getClaims())
                .target(userData.getTarget())
                .build();
    }

    private SignaturesDTO toDTO(Signatures signatures) {
        if (signatures == null) {
            return null;
        }

        return SignaturesDTO.builder()
                .common(toDTO(signatures.getCommon()))
                .special(toDTO(signatures.getSpecial()))
                .build();
    }

    private SignatureDTO toDTO(Signature signature) {
        if (signature == null) {
            return null;
        }

        return SignatureDTO.builder()
                .mobile(signature.getMobile())
                .web(signature.getWeb())
                .build();
    }

    public UserData toEntity(UserDataDTO dto) {
        if (dto == null) {
            return null;
        }

        return new UserData(
                dto.getClientId(),
                dto.getOrganizationId(),
                dto.getSegment(),
                dto.getOrganizations(),
                dto.getCurrentMethod(),
                dto.getMobileApp(),
                dto.getRole(),
                toEntity(dto.getSignatures()),
                dto.getAvailableMethods(),
                dto.getClaims(),
                dto.getTarget()
        );
    }

    private Signatures toEntity(SignaturesDTO dto) {
        if (dto == null) {
            return null;
        }

        var sign = new Signatures();
        sign.setCommon(toEntity(dto.getCommon()));
        sign.setSpecial(toEntity(dto.getSpecial()));
        return sign;
    }

    private Signature toEntity(SignatureDTO dto) {
        if (dto == null) {
            return null;
        }

        return new Signature(dto.getMobile(), dto.getWeb());
    }

    public ModelRequestDTO toModelRequest(UserDataDTO userDataDTO) {
        return ModelRequestDTO.builder()
                .commonMobile(userDataDTO.getSignatures().getCommon().getMobile())
                .commonWeb(userDataDTO.getSignatures().getCommon().getWeb())
                .specialMobile(userDataDTO.getSignatures().getSpecial().getMobile())
                .specialWeb(userDataDTO.getSignatures().getSpecial().getWeb())
                .segment(userDataDTO.getSegment())
                .role(userDataDTO.getRole())
                .target(userDataDTO.getTarget())
                .claims(userDataDTO.getClaims())
                .build();
    }
}
