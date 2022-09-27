package com.team7.chaekin.domain.todaybook.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
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
//        List<BookLog> bookLogs = bookLogRepository.findByMember(member).orElseThrow(() -> new RuntimeException("message"));
        List<BookLog> bookLogs = bookLogRepository.findWithTodayBooksByMember(member);

        List<TodayBookListDto> todayBookListDtos = new ArrayList<>();

        for (BookLog bookLog : bookLogs) {
            List<TodayBook> todayBooks = bookLog.getTodayBooks();
            // 날짜가 저 사이인 값만 리턴하기

            for (TodayBook todayBook : todayBooks) {
                LocalDateTime readDateTime = todayBook.getCreatedAt();
                if(readDateTime.isAfter(end) || readDateTime.isBefore(start))
                    continue;

                Book book = todayBook.getBookLog().getBook();
                String readDate = readDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
                TodayBookListDto todayBookListDto = TodayBookListDto.builder().TodayBookId(todayBook.getId()).readDate(todayBook.getCreatedAt().toString()).bookId(book.getId()).cover(book.getCover()).build();
                todayBookListDtos.add(todayBookListDto);
            }
        }

        TodayBookListResponse todayBookListResponse = new TodayBookListResponse();
        todayBookListResponse.setTodaybooks(todayBookListDtos);
        return todayBookListResponse;
    }

    public void registerTodayBook(long memberId, TodayBookRequest todayBookRequest) {

        Member member = memberRepository.findById(memberId).get();
        Book book = bookRepository.findByIsbn(todayBookRequest.getIsbn()).orElseThrow(() -> new RuntimeException("message"));
        BookLog bookLog = bookLogRepository.findByMemberAndBook(member, book)
                .orElseGet(() -> bookLogRepository.save(BookLog.builder()
                        .member(member)
                        .book(book)
                        .readStatus(ReadStatus.READING).build()));

        TodayBook todayBook = new TodayBook(bookLog);
        todayBookRepository.save(todayBook);

    }

    public void deleteTodayBook(long todayBookId) {

        TodayBook todayBook = todayBookRepository.findById(todayBookId).orElseThrow(() -> new RuntimeException("message"));
        todayBook.delete();
        todayBookRepository.delete(todayBook);
    }
}
