package com.team7.chaekin.domain.todaybook.controller;

import com.team7.chaekin.domain.report.dto.*;
import com.team7.chaekin.domain.todaybook.dto.AllBookLogListResponse;
import com.team7.chaekin.domain.todaybook.dto.BookLogRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("api/v1/booklogs")
@CrossOrigin(origins = "*")
public class TodayBookController {

    @GetMapping("")
    public ResponseEntity<?> getAllReportList(@RequestParam long memberId, @RequestParam String period, @RequestParam Date date) throws Exception {
        return ResponseEntity.ok(new AllBookLogListResponse());
    }

    @PostMapping("")
    public ResponseEntity<?> writeReport(@RequestBody BookLogRequest bookLogRequest) throws Exception {

        // ok만 보내주면 되나?
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{booklogId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long booklogId) throws Exception {
        return ResponseEntity.noContent().build();
    }

}
