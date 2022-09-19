package com.team7.chaekin.domain.reportcomment.controller;

import com.team7.chaekin.domain.reportcomment.dto.ReportCommentIdResponse;
import com.team7.chaekin.domain.reportcomment.dto.ReportCommentListResponse;
import com.team7.chaekin.domain.reportcomment.dto.ReportCommentRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/reports")
@CrossOrigin(origins = "*")
public class ReportCommentController {

    @GetMapping("/{reportId}/comments")
    public ResponseEntity<?> getReportCommentList(@PathVariable Long reportId, Pageable pageable) throws Exception {
        return ResponseEntity.ok(new ReportCommentListResponse());
    }

    @PostMapping("/{reportId}/comments")
    public ResponseEntity<?> writeReportComment(@RequestBody ReportCommentRequest reportCommentRequest) throws Exception {

        return ResponseEntity.ok(new ReportCommentIdResponse());
    }

    @PatchMapping("/{reportId}/comments/{reportCommentId}")
    public ResponseEntity<?> modifyReportComment(@RequestBody ReportCommentRequest reportCommentRequest) throws Exception {

        return ResponseEntity.ok(new ReportCommentIdResponse());
    }

    @DeleteMapping("/{reportId}/comments/{reportCommentId}")
    public ResponseEntity<?> deleteReportComment(@PathVariable Long reportCommentId) throws Exception {

        return ResponseEntity.noContent().build();
    }

}
