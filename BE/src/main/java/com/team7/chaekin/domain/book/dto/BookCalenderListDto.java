package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class BookCalenderListDto {
    private int day;
    private Boolean isExist;
    private List<BookCalenderDto> books;
}
