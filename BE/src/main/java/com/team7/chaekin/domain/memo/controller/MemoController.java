package com.team7.chaekin.domain.memo.controller;

import com.team7.chaekin.domain.memo.dto.MemoListResponse;
import com.team7.chaekin.domain.memo.dto.MemoRequest;
import com.team7.chaekin.domain.memo.service.MemoService;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/v1/books")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MemoController {
    private final MemoService memoService;

    @GetMapping("/{bookId}/memos")
    public ResponseEntity<MemoListResponse> getMemos(@PathVariable long bookId, @LoginMemberId long memberId) {
        return ResponseEntity.ok(memoService.getMemos(bookId, memberId));
    }

    @PostMapping("/{bookId}/memos")
    public ResponseEntity<?> createMemo(@PathVariable long bookId, @LoginMemberId long memberId,
                                        @RequestBody MemoRequest memoRequest) {
        memoService.createMemo(bookId, memberId, memoRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{bookId}/memos/{memoId}")
    public ResponseEntity<?> updateMemo(@PathVariable long bookId, @PathVariable long memoId,
                                        @LoginMemberId long memberId, @RequestBody MemoRequest memoRequest) {
        memoService.updateMemo(bookId, memoId, memberId, memoRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{bookId}/memos/{memoId}")
    public ResponseEntity<?> deleteMemo(@PathVariable long bookId, @PathVariable long memoId,
                                        @LoginMemberId long memberId){
        memoService.deleteMemo(bookId, memberId, memoId);
        return ResponseEntity.noContent().build();
    }
}
