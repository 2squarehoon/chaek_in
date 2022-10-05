package com.team7.chaekin.domain.book.repository;

import com.team7.chaekin.domain.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface BookRepository extends JpaRepository<Book, Long>, BookRepositoryCustom {
    Optional<Book> findByIsbn(String isbn);

    @Query("SELECT b FROM Book b WHERE b.id IN :bookIds " +
            "ORDER BY b.id")
    List<Book> findByBookIds(@Param("bookIds") List<Long> bookIds);

    List<Book> findByIsbnIn(List<String> isbn);
}
