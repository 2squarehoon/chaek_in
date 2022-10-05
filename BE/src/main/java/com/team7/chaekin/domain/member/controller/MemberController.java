package com.team7.chaekin.domain.member.controller;

import com.team7.chaekin.domain.member.dto.*;
import com.team7.chaekin.domain.member.service.MemberService;
import com.team7.chaekin.domain.memo.dto.MemberTokenResponse;
import com.team7.chaekin.global.oauth.config.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@Valid @RequestBody MemberLoginRequest memberLoginRequest) {
        return ResponseEntity.ok(memberService.login(memberLoginRequest.getId(), memberLoginRequest.getPassword()));
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

    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> getMyInformation(@LoginMemberId long memberId) {
        return ResponseEntity.ok(memberService.getMyInformation(memberId));
    }

    @PostMapping("/me")
    public ResponseEntity<MemberTokenResponse> saveAdditionalInformation(@RequestBody @Valid MemberCreateRequest memberCreateRequest) {
        MemberTokenResponse memberTokenResponse = memberService.saveAdditionalInformation(memberCreateRequest);
        return ResponseEntity.ok(memberTokenResponse);
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateAdditionalInformation(@RequestBody @Valid MemberUpdateRequest memberUpdateRequest,
                                                         @LoginMemberId long memberId) {
        memberService.updateAdditionalInformation(memberId, memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deleteMember(@LoginMemberId long memberId) {
        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
