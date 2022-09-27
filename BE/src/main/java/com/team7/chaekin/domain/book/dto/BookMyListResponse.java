package com.team7.chaekin.domain.book.dto;

import com.team7.chaekin.domain.book.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@AllArgsConstructor
@Data
public class BookMyListResponse {
    private List<BookMyDto> books;
}
