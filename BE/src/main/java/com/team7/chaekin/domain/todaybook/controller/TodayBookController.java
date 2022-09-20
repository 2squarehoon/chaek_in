package com.team7.chaekin.domain.todaybook.controller;

import com.team7.chaekin.domain.todaybook.dto.TodayBookListResponse;
import com.team7.chaekin.domain.todaybook.dto.TodayBookRequest;
import com.team7.chaekin.domain.todaybook.dto.TodayBookSearchRequest;
import com.team7.chaekin.domain.todaybook.service.TodayBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/todaybooks")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TodayBookController {

    private final TodayBookService todayBookService;

    @GetMapping("")
    public ResponseEntity<?> getTodayBookList(@RequestBody TodayBookSearchRequest todayBookSearchRequest) {

        TodayBookListResponse todayBookListResponse = todayBookService.getTodayBookList(todayBookSearchRequest);
        return ResponseEntity.ok(todayBookListResponse);
    }

    @PostMapping("")
    public ResponseEntity<?> registerTodayBook(@RequestBody TodayBookRequest todayBookRequest) {

        long memberId = 1;
        todayBookService.registerTodayBook(memberId, todayBookRequest);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{todayBookId}")
    public ResponseEntity<?> deleteTodayBook(@PathVariable long todayBookId) {

        todayBookService.deleteTodayBook(todayBookId);
        return ResponseEntity.noContent().build();
    }

}
