package com.team7.chaekin.domain.review.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ReviewRequest {
    @Min(0) @Max(5)
    private double score;
    @NotBlank
    @Size(min = 1, max = 1000)
    private String comment;
}
