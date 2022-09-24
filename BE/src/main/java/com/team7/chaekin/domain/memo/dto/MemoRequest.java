package com.team7.chaekin.domain.memo.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class MemoRequest {
    @NotBlank(message = "Can not be null or empty.")
    private String color;
    @NotBlank(message = "Can not be null or empty.")
    @Size(min = 1, max = 1000)
    private String content;
}
