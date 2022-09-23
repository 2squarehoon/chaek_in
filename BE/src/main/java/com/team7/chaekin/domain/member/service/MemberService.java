package com.team7.chaekin.domain.member.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.dto.*;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.memo.dto.MemberTokenResponse;
import com.team7.chaekin.global.oauth.token.TokenProperties;
import com.team7.chaekin.global.oauth.token.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenProperties tokenProperties;
    private final BookLogRepository bookLogRepository;
    private final TokenUtils tokenUtils;

    @Transactional
    public MemberLoginResponse login(String identifier) {
        MemberLoginResponse memberLoginResponse = new MemberLoginResponse();

        memberRepository.findByIdentifier(identifier).ifPresentOrElse(
                member -> {
                    TokenSet issueTokens = issueNewTokenSet(member);
                    memberLoginResponse.setIsFirst(false);
                    memberLoginResponse.setAccessToken(issueTokens.getAccess());
                    memberLoginResponse.setRefreshToken(issueTokens.getRefresh());
                    memberLoginResponse.setNickname(member.getNickname());
                },
                () -> memberLoginResponse.setIsFirst(true));
        return memberLoginResponse;
    }

    @Transactional
    public MemberBooksResponse getMemberBooks(long memberId) {
        Member member = getMember(memberId);
        List<BookLog> bookLogList = bookLogRepository.findByMember(member);

        List<MemberBookListDto> readingBooks = new ArrayList<>();
        List<MemberBookListDto> completeBooks = new ArrayList<>();

        for (BookLog bookLog : bookLogList) {
            List<MemberBookListDto> saveList = bookLog.getReadStatus().equals(ReadStatus.READING) ?
                    readingBooks : completeBooks;

            Book book = bookLog.getBook();
            saveList.add(MemberBookListDto.builder()
                    .bookId(book.getId())
                    .isbn(book.getIsbn())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .cover(book.getCover())
                    .build());
        }

        return new MemberBooksResponse(readingBooks, completeBooks);
    }

    @Transactional
    public MemberTokenResponse saveAdditionalInformation(MemberCreateRequest memberCreateRequest) {
        Member member = memberRepository.save(memberCreateRequest.toEntity());

        TokenSet issueTokens = issueNewTokenSet(member);
        return new MemberTokenResponse(issueTokens.getAccess(), issueTokens.getRefresh());
    }

    @Transactional
    public void updateAdditionalInformation(long memberId, MemberUpdateRequest memberUpdateRequest) {
        Member findMember = getMember(memberId);
        findMember.updateInformation(memberUpdateRequest);
    }

    @Transactional
    public void deleteMember(long memberId) {
        Member member = getMember(memberId);
        member.deleteMember();
    }

    private Member getMember(long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException());
        if (findMember.isRemoved()) {
            log.info("Deleted Member : memberId = {}", memberId);
            throw new RuntimeException("해당 회원이 존재하지 않습니다.");
        }

        return findMember;
    }

    private TokenSet issueNewTokenSet(Member member) {
        String accessToken = tokenUtils.createJwt(member.getId(), tokenProperties.getAccess().getName());
        String refreshToken = tokenUtils.createJwt(member.getId(), tokenProperties.getRefresh().getName());
        log.info("Issue New Token : Access-Token = {}, Refresh-Token = {}", accessToken, refreshToken);

        member.saveRefreshToken(refreshToken);
        return new TokenSet(accessToken, refreshToken);
    }

    public MemberInfoResponse getMyInformation(long memberId) {
        Member member = getMember(memberId);
        return MemberInfoResponse.builder()
                .nickname(member.getNickname())
                .age(member.getAge())
                .job(member.getJob())
                .gender(member.getGender()).build();
    }
}
