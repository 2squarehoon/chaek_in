package com.team7.chaekin.domain.book.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class BookCalenderRequest {
    @Min(1) @Max(12)
    private int month;
}
