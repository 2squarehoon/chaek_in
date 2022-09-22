package com.team7.chaekin.global.properties;


import com.team7.chaekin.global.oauth.config.CorsProperties;
import com.team7.chaekin.global.oauth.token.TokenProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(value = {TokenProperties.class, CorsProperties.class})
public class PropertiesConfig {
}
