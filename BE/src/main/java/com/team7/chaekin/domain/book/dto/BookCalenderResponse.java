package com.team7.chaekin.domain.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class BookCalenderResponse {
    private int month;
    private BookCalenderListDto[] calenderList;
}
