package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookMyDto {
    private long bookId;
    private String title;
    private String author;
    private String cover;
    private String ratingScore;
}
