package com.team7.chaekin.domain.memo.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.memo.dto.MemoListDto;
import com.team7.chaekin.domain.memo.dto.MemoListResponse;
import com.team7.chaekin.domain.memo.dto.MemoRequest;
import com.team7.chaekin.domain.memo.entity.Memo;
import com.team7.chaekin.domain.memo.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemoService {

    private final MemoRepository memoRepository;
    private final BookLogRepository bookLogRepository;

    @Transactional
    public MemoListResponse getMemos(long bookId, long memberId) {
        BookLog bookLog = getBookLog(bookId, memberId);
        List<MemoListDto> list = memoRepository.findByBookLog(bookLog).stream()
                .map(memo -> MemoListDto.builder()
                        .memoId(memo.getId())
                        .color(memo.getColor())
                        .content(memo.getContent())
                        .build()).collect(Collectors.toList());
        return new MemoListResponse(list);
    }

    @Transactional
    public void createMemo(long bookId, long memberId, MemoRequest memoRequest) {
        BookLog bookLog = getBookLog(bookId, memberId);

        memoRepository.save(Memo.builder()
                        .bookLog(bookLog)
                        .color(memoRequest.getColor())
                        .content(memoRequest.getContent()).build());
    }

    @Transactional
    public void updateMemo(long bookId, long memoId, long memberId, MemoRequest memoRequest) {
        BookLog bookLog = getBookLog(bookId, memberId);
        Memo memo = getMemo(memoId);

        checkMemoIsMine(bookLog, memo);
        memo.update(memoRequest.getColor(), memoRequest.getContent());
    }

    @Transactional
    public void deleteMemo(long bookId, long memberId, long memoId) {
        BookLog bookLog = getBookLog(bookId, memberId);
        Memo memo = getMemo(memoId);

        checkMemoIsMine(bookLog, memo);
        memoRepository.delete(memo);
    }

    private void checkMemoIsMine(BookLog bookLog, Memo memo) {
        if (!bookLog.getId().equals(memo.getBookLog().getId())) {
            throw new RuntimeException("권한이 없습니다.");
        }
    }

    private Memo getMemo(long memoId) {
        return memoRepository.findById(memoId)
                .orElseThrow(() -> new RuntimeException("해당 메모가 존재하지 않습니다."));
    }

    private BookLog getBookLog(long bookId, long memberId) {
        return bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new RuntimeException("책을 읽은 기록이 없습니다."));
    }
}
