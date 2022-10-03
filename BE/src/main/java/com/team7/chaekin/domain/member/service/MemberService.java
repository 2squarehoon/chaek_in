package com.team7.chaekin.domain.member.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BookLogRepository;
import com.team7.chaekin.domain.member.dto.*;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.memo.dto.MemberTokenResponse;
import com.team7.chaekin.global.error.errorcode.DomainErrorCode;
import com.team7.chaekin.global.error.exception.CustomException;
import com.team7.chaekin.global.oauth.token.TokenProperties;
import com.team7.chaekin.global.oauth.token.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static com.team7.chaekin.global.error.errorcode.DomainErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenProperties tokenProperties;
    private final BookLogRepository bookLogRepository;
    private final TokenUtils tokenUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public MemberLoginResponse login(String id, String password) {
        MemberLoginResponse memberLoginResponse = new MemberLoginResponse();

        memberRepository.findByIdentifier(id)
                .ifPresent(member -> {
                            if (bCryptPasswordEncoder.matches(password, member.getPassword())) {
                                TokenSet issueTokens = issueNewTokenSet(member);
                                memberLoginResponse.setIsFirst(false);
                                memberLoginResponse.setAccessToken(issueTokens.getAccess());
                                memberLoginResponse.setRefreshToken(issueTokens.getRefresh());
                                memberLoginResponse.setNickname(member.getNickname());
                                memberLoginResponse.setMemberId(member.getId());
                            }
                });
        if (!StringUtils.hasText(memberLoginResponse.getAccessToken())) {
            memberLoginResponse.setIsFirst(true);
        }
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
        memberCreateRequest.encryptPassword(bCryptPasswordEncoder);

        memberRepository.findByIdentifier(memberCreateRequest.getIdentifier())
                .ifPresent(m -> {
                    if (bCryptPasswordEncoder.matches(memberCreateRequest.getPassword(), m.getPassword())) {
                        throw new CustomException(DomainErrorCode.ALREADY_REGIST_MEMBER);
                    }
                    throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
                });
        Member member = memberRepository.save(memberCreateRequest.toEntity());

        TokenSet issueTokens = issueNewTokenSet(member);
        return new MemberTokenResponse(issueTokens.getAccess(), issueTokens.getRefresh(), member.getId());
    }

    @Transactional
    public void updateAdditionalInformation(long memberId, MemberUpdateRequest memberUpdateRequest) {
        Member findMember = getMember(memberId);
        findMember.updateInformation(memberUpdateRequest);
    }

    @Transactional
    public void deleteMember(long memberId) {
        Member member = getMember(memberId);
        memberRepository.delete(member);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_IS_NOT_EXIST));
    }

    private TokenSet issueNewTokenSet(Member member) {
        String accessToken = tokenUtils.createJwt(member.getId(), tokenProperties.getAccess().getName());
        String refreshToken = tokenUtils.createJwt(member.getId(), tokenProperties.getRefresh().getName());

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
