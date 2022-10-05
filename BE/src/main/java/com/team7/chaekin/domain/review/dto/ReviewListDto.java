package com.team7.chaekin.domain.review.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewListDto {
    private long reviewId;
    private String writer;
    private String score;
    private String comment;
    private Boolean isMine;
}
