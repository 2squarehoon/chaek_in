package com.team7.chaekin.domain.book.repository;

import com.team7.chaekin.domain.book.entity.Book;

import java.util.List;

public interface BookRepositoryCustom {
    List<Book> findBookListBySearch(String keyword);
}
