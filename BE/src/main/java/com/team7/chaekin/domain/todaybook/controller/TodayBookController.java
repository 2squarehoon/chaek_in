package com.team7.chaekin.domain.todaybook.controller;

import com.team7.chaekin.domain.todaybook.dto.TodayBookListResponse;
import com.team7.chaekin.domain.todaybook.dto.TodayBookRequest;
import com.team7.chaekin.domain.todaybook.dto.TodayBookSearchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/todaybooks")
@CrossOrigin(origins = "*")
public class TodayBookController {

    @GetMapping("")
    public ResponseEntity<?> getTodayBookList(@RequestBody TodayBookSearchRequest todayBookSearchRequest) {
        return ResponseEntity.ok(new TodayBookListResponse());
    }

    @PostMapping("")
    public ResponseEntity<?> registerTodayBook(@RequestBody TodayBookRequest todayBookRequest) {

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{todayBookId}")
    public ResponseEntity<?> deleteTodayBook(@PathVariable Long todayBookId) {
        return ResponseEntity.noContent().build();
    }

}
