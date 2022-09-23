package com.team7.chaekin.domain.memo.service;

import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.memo.dto.MemoListDto;
import com.team7.chaekin.domain.memo.dto.MemoListResponse;
import com.team7.chaekin.domain.memo.dto.MemoRequest;
import com.team7.chaekin.domain.memo.entity.Memo;
import com.team7.chaekin.domain.memo.repository.MemoRepository;
import com.team7.chaekin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

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
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
    }

    private Memo getMemo(long memoId) {
        return memoRepository.findById(memoId)
                .orElseThrow(() -> new CustomException(MEMO_IS_NOT_EXIST));
    }

    private BookLog getBookLog(long bookId, long memberId) {
        return bookLogRepository.findBookLogByMemberIdAndBookId(memberId, bookId)
                .orElseThrow(() -> new CustomException(BOOKLOG_IS_NOT_EXIST));
    }
}
