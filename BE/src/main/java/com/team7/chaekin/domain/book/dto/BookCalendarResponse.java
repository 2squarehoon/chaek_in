package com.team7.chaekin.domain.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BookCalendarResponse {
    private BookCalendarListDto[] calendarList;
}
