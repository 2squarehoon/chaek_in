package com.team7.chaekin.domain.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookListDto {
    private long bookId;
    private String title;
    private String image;
}
