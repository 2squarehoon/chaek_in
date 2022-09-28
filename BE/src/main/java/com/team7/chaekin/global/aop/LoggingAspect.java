package com.team7.chaekin.global.aop;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Aspect
@Component
public class LoggingAspect {

    private final ObjectMapper objectMapper;

    @Around("within(com.team7.chaekin..controller..*)")
    public Object loggingController(ProceedingJoinPoint joinPoint) throws Throwable {
        String params = getParams(joinPoint);
        log.info("[Controller] Method = {}, params = {}", joinPoint.getSignature().getName(), params);
        Object result = null;
        try {
            result = joinPoint.proceed();
            return result;
        } finally {
            ResponseEntity response = (ResponseEntity) result;
            String value = "";
            if (response != null) {
                value = objectMapper.writeValueAsString(response.getBody());
            }
            log.info(" <====== [Response] Response value = {}", value.length() > 50 ? value.substring(0, 50) : value);
        }
    }

    @Around("within(com.team7.chaekin..service..*)")
    public Object loggingService(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long end = System.currentTimeMillis();
            log.info("[Service] {} : Execute Time = {}ms", joinPoint.getSignature().getName(), end - start);
        }
    }

    private String getParams(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        if (parameterNames.length == 0) {
            return "None";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < parameterNames.length; i++) {
            sb.append(parameterNames[i]).append(" : ").append(args[i]);
            if (i != parameterNames.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");

        return sb.toString();
    }
}
