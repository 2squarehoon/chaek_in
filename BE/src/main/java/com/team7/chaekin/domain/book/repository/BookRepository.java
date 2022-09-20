package com.team7.chaekin.domain.book.repository;

import com.team7.chaekin.domain.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Long> {

}
