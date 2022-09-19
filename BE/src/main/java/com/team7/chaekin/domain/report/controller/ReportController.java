package com.team7.chaekin.domain.report.controller;

import com.team7.chaekin.domain.report.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"api/v1/reports", "api/v1/members"})
@CrossOrigin(origins = "*")
public class ReportController {

    @GetMapping("")
    public ResponseEntity<?> getAllReportList(@RequestParam String keyword, Pageable pageable) throws Exception {
        return ResponseEntity.ok(new AllReportListResponse());
    }

    @GetMapping("/{memberId}/reports")
    public ResponseEntity<?> getReportList(@PathVariable Long memberId) throws Exception {
        return ResponseEntity.ok(new UserReportListResponse());
    }


    @GetMapping("/{reportId}")
    public ResponseEntity<?> getReportDetail(@PathVariable Long reportId) throws Exception {
        return ResponseEntity.ok(new ReportResponse());
    }

    @PostMapping("")
    public ResponseEntity<?> writeReport(@RequestBody ReportCreateRequest reportCreateRequest) throws Exception {

        return ResponseEntity.ok(new ReportIdResponse());
    }

    @PatchMapping("/{reportId}")
    public ResponseEntity<?> modifyReport(@PathVariable Long reportId, @RequestBody ReportUpdateRequest reportUpdateRequest) throws Exception {
        return ResponseEntity.ok(new ReportIdResponse());
    }

    @DeleteMapping("/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) throws Exception {
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{reportId}/like")
    public ResponseEntity<?> upDownReportLike(@PathVariable Long reportId) throws Exception {
        return ResponseEntity.ok(new ReportLikeResponse());
    }

}
