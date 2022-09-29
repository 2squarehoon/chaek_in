package com.team7.chaekin.domain.meeting.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meeting.entity.QMeeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.team7.chaekin.domain.book.entity.QBook.book;
import static com.team7.chaekin.domain.meeting.entity.QMeeting.*;

public class MeetingRepositoryImpl implements MeetingRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MeetingRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Meeting> searchMeetingList(String keyword, Pageable pageable) {
        JPAQuery<Meeting> query = queryFactory.selectFrom(meeting)
                .where(keywordLike(keyword), meeting.isRemoved.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        List<Meeting> contents = query.fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(meeting.count())
                .from(meeting)
                .where(keywordLike(keyword), meeting.isRemoved.isFalse());

        return PageableExecutionUtils.getPage(contents, pageable, countQuery::fetchOne);
    }

    private BooleanExpression keywordLike(String keyword) {
        if (!StringUtils.hasText(keyword))
            return null;
        String trimKeyword = keyword.replace(" ", "");
        StringExpression se1 = Expressions.stringTemplate("replace({0}, ' ', '')", meeting.title);
        StringExpression se2 = Expressions.stringTemplate("replace({0}, ' ', '')", meeting.book.title);
        return se1.containsIgnoreCase(trimKeyword)
                .or(se2.containsIgnoreCase(trimKeyword));
    }
}
