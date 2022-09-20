package com.team7.chaekin.domain.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookListResponse {
    private List<BookListDto> books;
}
