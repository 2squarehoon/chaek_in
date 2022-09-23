package com.team7.chaekin.global.error.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum DomainErrorCode implements ErrorCode {
    DO_NOT_HAVE_AUTHENTICATION(HttpStatus.UNAUTHORIZED, "You don't have an authentication."),
    DO_NOT_HAVE_AUTHORIZATION(HttpStatus.FORBIDDEN, "You don't have an authorization."),
    NO_SUCH_ELEMENTS(HttpStatus.NOT_FOUND, "Don't exist such resource."),

    MEMBER_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Member is not exist"),
    ALREADY_REGIST_MEMBER(HttpStatus.BAD_REQUEST, "Already registed member"),

    BOOK_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "The book is not exist."),

    BOOKLOG_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "The Book log is not exist."),

    MEETING_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Meeting is not exist."),
    IMPOSSIBLE_CAPACITY_LESS_THAN_CURRENT_MEMBERS(HttpStatus.BAD_REQUEST, "Current members more than capacity."),

    COMMENT_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Comment is Not Exist"),
    WRONG_LOCATION_COMMENT(HttpStatus.BAD_REQUEST, "You have specified the wrong location for a comment"),

    MEMO_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Memo is not exist."),

    PARTICIPANT_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Participant is not exist."),
    MEMBER_IS_NOT_BELONG_MEETING(HttpStatus.BAD_REQUEST, "Member is Not belong meeting"),

    REVIEW_IS_NOT_EXIST(HttpStatus.NOT_FOUND, "Review is not exist."),

    INVALID_BOOK_ID(HttpStatus.BAD_REQUEST, "Invalid bookId in request."),;
    private final HttpStatus httpStatus;
    private final String message;
}
