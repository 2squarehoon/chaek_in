package com.team7.chaekin.domain.book.service;

import com.team7.chaekin.domain.book.dto.BookListDto;
import com.team7.chaekin.domain.book.dto.BookListResponse;
import com.team7.chaekin.domain.book.dto.BookSearchRequest;
import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    @Transactional(readOnly = true)
    public BookListResponse search(BookSearchRequest bookSearchRequest, Pageable pageable){
        Slice<Book> slice = bookRepository.findByTitleContaining(bookSearchRequest.getKeyword(), pageable)
                .orElseThrow(() -> new NoSuchElementException("검색 결과가 존재하지 않습니다."));
        List<BookListDto> list = new ArrayList<>();
        for (Book book : slice) {
            list.add(new BookListDto(book.getId(), book.getTitle(), book.getCover()));
        }

        return new BookListResponse(list);
    }
}
