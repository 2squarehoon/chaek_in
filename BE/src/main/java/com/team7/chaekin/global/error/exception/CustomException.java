package com.team7.chaekin.global.error.exception;

import com.team7.chaekin.global.error.errorcode.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        log.info("[Error Occur] : Error name = {}, message = {}", errorCode.name(), errorCode.getMessage());
        this.errorCode = errorCode;
    }
}