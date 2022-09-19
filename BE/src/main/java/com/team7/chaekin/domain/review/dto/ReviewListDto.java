package com.team7.chaekin.domain.review.dto;

import lombok.Data;

@Data
public class ReviewListDto {
    private long reviewId;
    private String writer;
    private double score;
    private long comment;
}
