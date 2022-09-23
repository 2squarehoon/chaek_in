package com.team7.chaekin.domain.review.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewListDto {
    private long reviewId;
    private String writer;
    private double score;
    private String comment;
}
