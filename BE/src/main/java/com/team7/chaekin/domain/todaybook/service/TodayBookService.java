package com.team7.chaekin.domain.todaybook.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
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
    private final BookLogRepository bookLogRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    public TodayBookListResponse getTodayBookList(TodayBookSearchRequest todayBookSearchRequest) {

        LocalDateTime start = null;
        LocalDateTime end = null;

        // 나중에 enum으로 변경
        // 나중에 weekly와 monthly는 날마다 1개의 데이터만 넣어서 주는 로직으로 변경할지도?
        if (todayBookSearchRequest.getPeriod().equals("DAILY")) {
            start = LocalDateTime.of(todayBookSearchRequest.getDate(), LocalTime.of(0, 0, 0));
            end = LocalDateTime.of(todayBookSearchRequest.getDate().plusDays(1), LocalTime.of(0, 0, 0));
        } else if (todayBookSearchRequest.getPeriod().equals("WEEKLY")) {
            start = LocalDateTime.of(todayBookSearchRequest.getDate().minusDays(7), LocalTime.of(0, 0, 0));
            end = LocalDateTime.of(todayBookSearchRequest.getDate(), LocalTime.of(0, 0, 0));
        } else {
            start = LocalDateTime.of(todayBookSearchRequest.getDate().with(TemporalAdjusters.firstDayOfMonth()), LocalTime.of(0, 0, 0));
            end = LocalDateTime.of(todayBookSearchRequest.getDate().with(TemporalAdjusters.lastDayOfMonth()).plusDays(1), LocalTime.of(0, 0, 0));
        }

        Member member = memberRepository.findById(todayBookSearchRequest.getMemberId()).orElseThrow(() -> new RuntimeException("message"));
        List<TodayBook> todayBooks = todayBookRepository.findByMemberAndCreatedAtBetween(member, start, end).orElseThrow(() -> new RuntimeException("message"));

        List<TodayBookListDto> todayBookListDtos = new ArrayList<>();
        for (TodayBook todayBook : todayBooks) {
            Book book = todayBook.getBookLog().getBook();
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
        Book book = bookRepository.findByIsbn(todayBookRequest.getIsbn()).orElseThrow(() -> new RuntimeException("message"));

        BookLog bookLog = bookLogRepository.findByMemberAndBook(member, book).orElseGet(() -> bookLogRepository.save(new BookLog(member, book)));

        TodayBook todayBook = TodayBook.builder().bookLog(bookLog).build();
        todayBookRepository.save(todayBook);

    }

    public void deleteTodayBook(long todayBookId) {
        todayBookRepository.deleteById(todayBookId);
    }
}
