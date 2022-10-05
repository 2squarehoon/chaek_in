package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class BookCalendarListDto {
    private String date;
    private List<BookCalendarDto> books;
}
