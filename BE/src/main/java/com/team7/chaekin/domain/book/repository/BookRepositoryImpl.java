package com.team7.chaekin.domain.book.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team7.chaekin.domain.book.entity.Book;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.team7.chaekin.domain.book.entity.QBook.book;

public class BookRepositoryImpl implements BookRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BookRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Book> findBookListBySearch(String keyword) {
        return queryFactory.selectFrom(book)
                .where(keywordLike(keyword)).fetch();
    }

    private BooleanExpression keywordLike(String keyword) {
        if (!StringUtils.hasText(keyword))
            return null;
        String replace = keyword.replace(" ", "");
        StringExpression se1 = Expressions.stringTemplate("replace({0}, ' ', '')", book.title);
        StringExpression se2 = Expressions.stringTemplate("replace({0}, ' ', '')", book.author);
        return se1.containsIgnoreCase(replace)
                .or(se2.containsIgnoreCase(replace));
    }
}
