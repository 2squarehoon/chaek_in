package com.team7.chaekin.domain.member.dto;

import lombok.Data;

@Data
public class MemberBookListDto {
    private long bookId;
    private String isbn;
    private String title;
    private String author;
    private String image;
}
