package com.team7.chaekin.domain.todaybook.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.Booklog;
import com.team7.chaekin.domain.booklog.repository.BooklogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.todaybook.dto.TodayBookListDto;
import com.team7.chaekin.domain.todaybook.dto.TodayBookListResponse;
import com.team7.chaekin.domain.todaybook.dto.TodayBookRequest;
import com.team7.chaekin.domain.todaybook.dto.TodayBookSearchRequest;
import com.team7.chaekin.domain.todaybook.entity.TodayBook;
import com.team7.chaekin.domain.todaybook.repository.TodayBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TodayBookService {

    private final TodayBookRepository todayBookRepository;
    private final BooklogRepository booklogRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    public TodayBookListResponse getTodayBookList(TodayBookSearchRequest todayBookSearchRequest) {

        LocalDateTime start = LocalDateTime.of(todayBookSearchRequest.getDate(), LocalTime.of(0, 0, 0));
        LocalDateTime end = null;
        if (todayBookSearchRequest.getPeriod().equals("DAILY"))
            end = LocalDateTime.of(todayBookSearchRequest.getDate().plusDays(1), LocalTime.of(0, 0, 0));
        else if (todayBookSearchRequest.getPeriod().equals("WEEKLY"))
            end = LocalDateTime.of(todayBookSearchRequest.getDate().plusDays(7), LocalTime.of(0, 0, 0));
        else
            end = LocalDateTime.of(todayBookSearchRequest.getDate().with(TemporalAdjusters.lastDayOfMonth()).plusDays(1), LocalTime.of(0, 0, 0));

        Member member = memberRepository.findById(todayBookSearchRequest.getMemberId()).get();
        List<TodayBook> todayBooks = todayBookRepository.findByMemberAndCreatedAtBetween(member, start, end);

        List<TodayBookListDto> todayBookListDtos = new ArrayList<>();
        for (TodayBook todayBook : todayBooks) {
            Book book = todayBook.getBooklog().getBook();
            String readDate = todayBook.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

            TodayBookListDto todayBookListDto = TodayBookListDto.builder().TodayBookId(todayBook.getId()).readDate(todayBook.getCreatedAt().toString()).bookId(book.getId()).cover(book.getCover()).build();
            todayBookListDtos.add(todayBookListDto);
        }

        TodayBookListResponse todayBookListResponse = new TodayBookListResponse();
        todayBookListResponse.setTodaybooks(todayBookListDtos);
        return todayBookListResponse;
    }

    public void registerTodayBook(long memberId, TodayBookRequest todayBookRequest) {

        Member member = memberRepository.findById(memberId).get();
        // findOneByIsbn 필요
        Book book = bookRepository.findOneByIsbn(todayBookRequest.getIsbn());

        Booklog booklog = booklogRepository.findOneByMemberAndBook(member, book);
        if (booklog == null) {
            booklog = Booklog.builder().member(member).book(book).build();
            booklogRepository.save(booklog);
        }

        TodayBook todayBook = TodayBook.builder().booklog(booklog).build();
        todayBookRepository.save(todayBook);

    }

    public void deleteTodayBook(Long todayBookId) {
        todayBookRepository.deleteById(todayBookId);
    }
}
