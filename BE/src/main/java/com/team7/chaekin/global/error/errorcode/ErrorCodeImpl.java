package com.team7.chaekin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorCodeImpl implements ErrorCode{
    private final String name;
    private String parameter;
    private final HttpStatus httpStatus;
    private final String message;

    @Override
    public String name() {
        return name;
    }
}
