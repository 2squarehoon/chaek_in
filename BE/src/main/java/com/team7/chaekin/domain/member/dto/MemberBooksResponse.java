package com.team7.chaekin.domain.member.dto;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class MemberBooksResponse {
    private List<MemberBookListDto> readingBooks;
    private List<MemberBookListDto> completeBooks;
}
