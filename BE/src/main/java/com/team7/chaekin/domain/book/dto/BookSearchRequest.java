package com.team7.chaekin.domain.book.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class BookSearchRequest {
    @NotBlank
    @Size(min = 1, max = 255)
    private String keyword;
}
