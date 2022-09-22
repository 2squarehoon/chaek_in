package com.team7.chaekin.domain.review.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private double score;
    private String comment;
}
