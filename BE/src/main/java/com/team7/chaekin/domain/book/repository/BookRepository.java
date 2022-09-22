package com.team7.chaekin.domain.book.repository;

import com.team7.chaekin.domain.book.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Page<Book>> findByTitleContaining(String title, Pageable pageable);

    Optional<Book> findByIsbn(String isbn);
}
