package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDetailResponse {
    private long bookId;
    private String isbn;
    private String author;
    private String description;
    private String cover;
    private String title;
    private String ratingScore;
    private Boolean isLiked;
    private String readStatus;
}
