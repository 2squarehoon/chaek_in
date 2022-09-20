package com.team7.chaekin;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.category.entity.Category;
import com.team7.chaekin.domain.category.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChaekinApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChaekinApplication.class, args);
	}

	@Bean
	CommandLineRunner run(CategoryRepository categoryRepository) {
		return args -> {
			categoryRepository.save(Category.builder()
							.cid("asd")
							.mall("asd")
							.depth1("asd")
							.name("asd").build());

		};
	}

}
