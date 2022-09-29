package com.team7.chaekin.global.notification.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Component
public class FCMInitializer {

    @Value("${fcm.certification}")
    private String googleApplicationCredentials;
    private final String scope = "";

    @PostConstruct
    public void initialize() throws IOException {
        ClassPathResource resource = new ClassPathResource(googleApplicationCredentials);

        try (InputStream is = resource.getInputStream()) {
            GoogleCredentials googleCredentials = GoogleCredentials.fromStream(is).createScoped(scope);
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                log.info("FirebaseApp initialization complete");
            }
        }
    }
}