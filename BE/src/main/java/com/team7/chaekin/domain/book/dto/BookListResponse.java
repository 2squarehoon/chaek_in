package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BookListResponse {
    List<BookResponse> books;
}
