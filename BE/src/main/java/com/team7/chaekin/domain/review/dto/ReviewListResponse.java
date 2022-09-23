package com.team7.chaekin.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ReviewListResponse {
    private int totalPages;
    private List<ReviewListDto> reviews;
}
