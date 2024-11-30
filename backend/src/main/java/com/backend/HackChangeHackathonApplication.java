package com.backend;

import com.backend.model.enums.SegmentType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class HackChangeHackathonApplication {
    public static void main(String[] args) {
        SpringApplication.run(HackChangeHackathonApplication.class, args);
    }

}
