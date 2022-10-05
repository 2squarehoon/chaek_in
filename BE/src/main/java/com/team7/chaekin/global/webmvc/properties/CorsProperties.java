package com.team7.chaekin.global.webmvc.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.List;

@Getter
@RequiredArgsConstructor
@ConstructorBinding
@ConfigurationProperties(value = "cors", ignoreInvalidFields = true)
public class CorsProperties {
    private final List<String> allowOrigins;
}
