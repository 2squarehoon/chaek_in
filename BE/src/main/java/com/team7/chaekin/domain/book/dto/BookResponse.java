package com.team7.chaekin.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponse {
    long bookId;
    String name;
    String image;
}
