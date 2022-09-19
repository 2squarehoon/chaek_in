package com.team7.chaekin.domain.member.controller;

import com.team7.chaekin.domain.member.dto.MemberBooksResponse;
import com.team7.chaekin.domain.member.dto.MemberInfoRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/members")
@RestController
public class MemberController {

    @GetMapping("/me/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{memberId}/books")
    public ResponseEntity<?> getMemberBooks(@PathVariable long memberId) {
        return ResponseEntity.ok(new MemberBooksResponse());
    }

    @PostMapping("/me")
    public ResponseEntity<?> saveAdditionalInformation(@RequestBody MemberInfoRequest memberInfoRequest) {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateAdditionalInformation(@RequestBody MemberInfoRequest memberInfoRequest) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteMember() {
        return ResponseEntity.noContent().build();
    }
}
