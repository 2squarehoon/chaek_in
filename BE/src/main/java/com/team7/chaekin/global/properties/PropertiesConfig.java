package com.team7.chaekin.global.properties;


import com.team7.chaekin.global.oauth.token.TokenProperties;
import com.team7.chaekin.global.webmvc.properties.CorsProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(value = {TokenProperties.class, CorsProperties.class})
public class PropertiesConfig {
}
