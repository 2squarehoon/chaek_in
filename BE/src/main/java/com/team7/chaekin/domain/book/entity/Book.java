package com.team7.chaekin.domain.book.entity;

import com.team7.chaekin.domain.category.entity.Category;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Builder
@Entity
@Table(name = "book")
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String isbn;
    private String title;
    private String author;
    private Date publishDate;
    private String description;
    private String cover;

    //    카테고리 id
    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    private Category categoryId;

    private String publisher;
    private int page;
    private double ratingScore;
    private int ratingCount;
}
