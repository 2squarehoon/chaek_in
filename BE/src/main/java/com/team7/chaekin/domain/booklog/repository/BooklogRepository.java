package com.team7.chaekin.domain.booklog.repository;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.Booklog;
import com.team7.chaekin.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooklogRepository extends JpaRepository<Booklog, Long> {
    Booklog findOneByMemberAndBook(Member member, Book book);
}
