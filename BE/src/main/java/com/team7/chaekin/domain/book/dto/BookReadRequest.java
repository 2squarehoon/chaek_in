package com.team7.chaekin.domain.book.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class BookReadRequest {
    @NotBlank
    @Size(min = 1, max = 20, message = "Isbn is not valid.")
    private String isbn;
}
