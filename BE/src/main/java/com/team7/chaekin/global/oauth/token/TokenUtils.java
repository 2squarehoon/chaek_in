package com.team7.chaekin.global.oauth.token;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Slf4j
@RequiredArgsConstructor
@Component
public class TokenUtils {
    private final TokenProperties tokenProperties;
    private final Map<String, Long> blackList = new ConcurrentHashMap<>();

    @Scheduled(fixedRate = 600000)
    protected void clearBlackList() {
        blackList.forEach((token, id) -> {
            if (!validateToken(token, tokenProperties.getAccess().getName()))
                blackList.remove(token);
        });
    }

    public void setBlackList(String accessToken, long memberId) {
        if (!StringUtils.hasText(accessToken) || memberId <= 0)
            return;
        log.info("Set Blacklist accessToken = {}, id = {}", accessToken, memberId);
        blackList.put(accessToken, memberId);
    }

    public boolean isInBlackList(String accessToken) {
        return blackList.get(accessToken) != null;
    }


    public String createJwt(long memberId, String tokenName) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Claims claims = Jwts.claims();
        claims.put("type", tokenName);
        claims.put("id", memberId);
        Date now = new Date();
        long expiredDate = tokenName.equals(tokenProperties.getAccess().getName())
                ? tokenProperties.getAccess().getExpiredTimeMilli()
                : tokenProperties.getRefresh().getExpiredTimeMilli();

        return Jwts.builder()
                .setHeader(headers)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expiredDate))
                .signWith(SignatureAlgorithm.HS256, tokenProperties.getSecret())
                .compact();
    }

    public boolean validateToken(String token, String tokenType) {
        if (!StringUtils.hasText(token) || !StringUtils.hasText(tokenType)) {
            return false;
        }
        try {
            Claims body = getClaimsInToken(token);
            String getType = (String) body.get("type");
            if (tokenType.equals(getType)) {
                if (tokenType.equals(tokenProperties.getAccess().getName()) && isInBlackList(token)) {
                    return false;
                }
                return true;
            }
        } catch (SecurityException | MalformedJwtException e) {
            log.info("JWT Signature is wrong.");
        }  catch (UnsupportedJwtException e) {
            log.info("JWT Token is unsupported.");
        } catch (IllegalArgumentException e) {
            log.info("JWT Token is wrong.");
        } catch (ExpiredJwtException e) {
            log.info("JWT Token is Expired");
            //TODO: 토큰 만료 시 리프레시 토큰으로 갱신 로직 추가
        }
        return false;
    }

    public long getTokenMemberId(String token) {
        try {
            Claims claims = getClaimsInToken(token);
            Object id = claims.get("id");
            log.info("Logout Member id = {}", id);
            return Long.valueOf((Integer) id);
        } catch (SecurityException | MalformedJwtException e) {
            log.info("JWT Signature is wrong.");
        }  catch (UnsupportedJwtException e) {
            log.info("JWT Token is unsupported.");
        } catch (IllegalArgumentException e) {
            log.info("JWT Token is wrong.");
        } catch (ExpiredJwtException e) {
            log.info("JWT Token is Expired");
        }
        return 0;
    }

    private Claims getClaimsInToken(String token) {
        return Jwts.parser().setSigningKey(tokenProperties.getSecret()).parseClaimsJws(token).getBody();
    }
}
