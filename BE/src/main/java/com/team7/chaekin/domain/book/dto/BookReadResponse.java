package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookReadResponse {
    private long bookId;
    private String title;
    private String readStatus;
}
