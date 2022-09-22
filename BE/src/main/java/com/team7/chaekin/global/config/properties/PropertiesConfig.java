package com.team7.chaekin.global.config.properties;


import com.team7.chaekin.global.oauth.token.TokenProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(value = {TokenProperties.class})
public class PropertiesConfig {
}
