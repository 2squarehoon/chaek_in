package com.team7.chaekin.global.oauth.config;

import com.team7.chaekin.global.oauth.exception.RestAuthenticationEntryPoint;
import com.team7.chaekin.global.oauth.filter.TokenAuthenticationFilter;
import com.team7.chaekin.global.oauth.handler.CustomLogoutHandler;
import com.team7.chaekin.global.webmvc.properties.CorsProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final TokenAuthenticationFilter tokenAuthenticationFilter;
    private final CustomLogoutHandler customLogoutHandler;
    private final CorsProperties corsProperties;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors().configurationSource(corsConfigurationSource(corsProperties))
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout()
                    .logoutUrl("/api/v1/members/logout")
                    .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                    .invalidateHttpSession(false)
                    .addLogoutHandler(customLogoutHandler)
                .and()
                .authorizeRequests()
                    .antMatchers("/api/v1/members/login").permitAll()
                    .antMatchers(HttpMethod.POST, "/api/v1/members/me").permitAll()
                    .anyRequest().authenticated()
                .and()
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint()).and().build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(CorsProperties corsProperties) {
        CorsConfiguration configuration = new CorsConfiguration();

        List<String> allowOrigins = corsProperties.getAllowOrigins();
        for (String allowOrigin : allowOrigins) {
            log.info("[Security Config] : Allow-Origin = {}", allowOrigin);
            configuration.addAllowedOrigin(allowOrigin);
        }
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
