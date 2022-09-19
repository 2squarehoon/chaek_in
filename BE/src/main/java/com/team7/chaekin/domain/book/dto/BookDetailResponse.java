package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDetailResponse {
    long bookId;
    String isbn;
    String author;
    String index;
    String description;
    String image;
}
