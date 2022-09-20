package com.team7.chaekin.domain.memo.controller;

import com.team7.chaekin.domain.memo.dto.MemoListResponse;
import com.team7.chaekin.domain.memo.dto.MemoRequest;
import com.team7.chaekin.domain.memo.service.MemoService;
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
    public ResponseEntity<?> getMemo(@PathVariable long bookId){
        return ResponseEntity.ok(new MemoListResponse());
    }

    @PostMapping("/{bookId}/memos")
    public ResponseEntity<?> createMemo(@PathVariable long bookId,
                                        @RequestBody MemoRequest memoRequest){
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{bookId}/memos/{memoId}")
    public ResponseEntity<?> updateMemo(@PathVariable Long bookId,
                                        @PathVariable Long memoId,
                                        @RequestBody MemoRequest memoRequest) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{bookId}/memos/{memoId}")
    public ResponseEntity<?> deleteMemo(@PathVariable Long bookId,
                                        @PathVariable Long memoId){
        return ResponseEntity.noContent().build();
    }
}
