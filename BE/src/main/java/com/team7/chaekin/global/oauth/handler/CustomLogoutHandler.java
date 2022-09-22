package com.team7.chaekin.global.oauth.handler;

import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.global.oauth.token.TokenProperties;
import com.team7.chaekin.global.oauth.token.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@Slf4j
@RequiredArgsConstructor
@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenUtils tokenUtils;
    private final TokenProperties tokenProperties;
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            String accessToken = bearerToken.substring(7);
            if (tokenUtils.validateToken(accessToken, tokenProperties.getAccess().getName())) {
                long memberId = tokenUtils.getTokenMemberId(accessToken);
                Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new NoSuchElementException("해당 회원이 존재하지 않습니다."));
                member.removeRefreshToken();
                tokenUtils.setBlackList(accessToken, memberId);
            }
        }
        //TODO: 토큰이 유효하지 않으면?? 401에러??
    }
}