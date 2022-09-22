package com.team7.chaekin.domain.report.controller;

import com.team7.chaekin.domain.report.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping({"api/v1/reports", "api/v1/members"})
//@CrossOrigin(origins = "*")
public class ReportController {

    @GetMapping("")
    public ResponseEntity<?> getAllReportList(@RequestBody ReportSearchRequest reportSearchRequest, Pageable pageable) {
        return ResponseEntity.ok(new AllReportListResponse());
    }

    @GetMapping("/{memberId}/reports")
    public ResponseEntity<?> getReportList(@PathVariable long memberId) {
        return ResponseEntity.ok(new UserReportListResponse());
    }


    @GetMapping("/{reportId}")
    public ResponseEntity<?> getReportDetail(@PathVariable long reportId) {
        return ResponseEntity.ok(new ReportResponse());
    }

    @PostMapping("")
    public ResponseEntity<?> writeReport(@RequestBody ReportCreateRequest reportCreateRequest) {

        return ResponseEntity.ok(new ReportIdResponse());
    }

    @PatchMapping("/{reportId}")
    public ResponseEntity<?> modifyReport(@PathVariable long reportId, @RequestBody ReportUpdateRequest reportUpdateRequest) {
        return ResponseEntity.ok(new ReportIdResponse());
    }

    @DeleteMapping("/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable long reportId) {
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{reportId}/like")
    public ResponseEntity<?> upDownReportLike(@PathVariable long reportId) throws Exception {
        return ResponseEntity.ok(new ReportLikeResponse());
    }

}
