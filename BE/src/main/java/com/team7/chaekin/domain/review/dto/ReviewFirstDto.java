package com.team7.chaekin.domain.review.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.PositiveOrZero;

@Data
public class ReviewFirstDto {
    @PositiveOrZero
    private long bookId;
    @Min(0) @Max(5)
    private double score;
}
