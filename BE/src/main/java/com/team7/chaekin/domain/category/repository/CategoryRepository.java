package com.team7.chaekin.domain.category.repository;

import com.team7.chaekin.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
