package com.team7.chaekin.domain.member.controller;

import com.team7.chaekin.domain.member.dto.*;
import com.team7.chaekin.domain.member.service.MemberService;
import com.team7.chaekin.domain.memo.dto.MemberTokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    private static long memberId = 1;

    @GetMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(MemberLoginRequest memberLoginRequest) {
        return ResponseEntity.ok(memberService.login(memberLoginRequest.getIdentifier()));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{memberId}/books")
    public ResponseEntity<?> getMemberBooks(@PathVariable long memberId) {
        MemberBooksResponse memberBooksResponse = memberService.getMemberBooks(memberId);
        return ResponseEntity.ok(memberBooksResponse);
    }

    @PostMapping("/me")
    public ResponseEntity<MemberTokenResponse> saveAdditionalInformation(@RequestBody MemberCreateRequest memberCreateRequest) {
        MemberTokenResponse memberTokenResponse = memberService.saveAdditionalInformation(memberCreateRequest);
        return ResponseEntity.ok(memberTokenResponse);
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateAdditionalInformation(@RequestBody MemberUpdateRequest memberUpdateRequest) {
        memberService.updateAdditionalInformation(memberId, memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteMember() {
        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
