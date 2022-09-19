package com.team7.chaekin.domain.review.dto;

import lombok.Data;

import java.util.List;

@Data
public class AllReviewListResponse {
    private List<ReviewListDto> reviews;
}
