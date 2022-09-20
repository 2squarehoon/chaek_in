package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class BookListDto {
    private long bookId;
    private String title;
    private String image;
}
