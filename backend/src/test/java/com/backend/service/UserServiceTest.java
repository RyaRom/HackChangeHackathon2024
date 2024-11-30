package com.backend.service;

import com.backend.controller.UserController;
import com.backend.model.UserDataMapper;
import com.backend.model.dto.SignatureDTO;
import com.backend.model.dto.SignaturesDTO;
import com.backend.model.dto.UserDataDTO;
import com.backend.model.dto.WebRequestDTO;
import com.backend.model.enums.PaymentMethod;
import com.backend.model.enums.SegmentType;
import com.backend.model.enums.UserRole;
import com.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private final UserDataMapper mapper = new UserDataMapper();

    private final UserDataDTO userDataDTO =
            UserDataDTO.builder()
                    .role(UserRole.USER)
                    .clientId("string")
                    .organizationId("string")
                    .segment(SegmentType.SMALL)
                    .organizations(0)
                    .mobileApp(true)
                    .signatures(SignaturesDTO.builder()
                            .common(SignatureDTO.builder()
                                    .web(0)
                                    .mobile(0)
                                    .build())
                            .special(SignatureDTO.builder()
                                    .web(0)
                                    .mobile(0)
                                    .build())
                            .build())
                    .availableMethods(List.of(PaymentMethod.SMS))
                    .currentMethod(PaymentMethod.SMS)
                    .claims(0)
                    .target(null)
                    .build();

    private final WebRequestDTO requestDTO = WebRequestDTO.builder()
            .clientId("string")
            .organizationId("string")
            .context("")
            .build();

    @Mock
    private UserRepo userRepo;

    @Mock
    private ModelService modelService;

    @Test
    void classify() {
        when(userRepo.findDistinctByClientIdAndOrganizationId("string", "string")).thenReturn(Optional.of(mapper.toEntity(userDataDTO)));
        when(modelService.classify(any())).thenReturn(PaymentMethod.PAY_CONTROL);
        UserService userService = new UserService(userRepo, mapper, modelService);
        UserController controller = new UserController(userService);
        PaymentMethod method = controller.getClassification(requestDTO).getBody();
        assertEquals(method, PaymentMethod.PAY_CONTROL);
    }

    @Test
    void update() {
        when(userRepo.findDistinctByClientIdAndOrganizationId("string", "string")).thenReturn(Optional.of(mapper.toEntity(userDataDTO)));
        when(modelService.classify(any())).thenReturn(PaymentMethod.PAY_CONTROL);
        UserService userService = new UserService(userRepo, mapper, modelService);
        UserController controller = new UserController(userService);
        PaymentMethod method = controller.addPrediction(requestDTO).getBody();

        assertEquals(method, PaymentMethod.PAY_CONTROL);
        verify(userRepo, atLeastOnce()).save(any());
    }
}