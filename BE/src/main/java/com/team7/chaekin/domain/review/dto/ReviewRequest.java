package com.team7.chaekin.domain.review.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ReviewRequest {
    @Min(value = 0, message = "Score is not valid.") @Max(value = 5, message = "Score is not valid.")
    private double score;
    @NotBlank
    @Size(min = 1, max = 1000, message = "Comment's length is not valid.")
    private String comment;
}
