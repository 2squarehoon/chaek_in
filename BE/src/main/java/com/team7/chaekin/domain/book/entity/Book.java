package com.team7.chaekin.domain.book.entity;

import com.team7.chaekin.domain.category.entity.Category;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Entity
@Table(name = "book")
@NoArgsConstructor
public class Book {
    @Id
    @Column(columnDefinition = "bigint(20)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String isbn;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String author;

    private Date publishDate;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String cover;

    //    카테고리 id
    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    private Category categoryId;

    @Column(length = 50)
    private String publisher;

    @Column(columnDefinition = "int(11)")
    private int page;

    private double ratingScore;

    @Column(columnDefinition = "int(11)")
    private int ratingCount;
}
