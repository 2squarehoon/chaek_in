package com.team7.chaekin;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.category.entity.Category;
import com.team7.chaekin.domain.category.repository.CategoryRepository;
import com.team7.chaekin.domain.meeting.entity.Meeting;
import com.team7.chaekin.domain.meeting.repository.MeetingRepository;
import com.team7.chaekin.domain.member.entity.Gender;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
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

//	@Bean
//	CommandLineRunner run(MemberRepository memberRepository,
//						  MeetingRepository meetingRepository,
//						  BookRepository bookRepository,
//						  CategoryRepository categoryRepository) {
//		return args -> {
//			for (int i = 0; i < 10; i++) {
//				memberRepository.save(Member.builder()
//						.nickname("name" + i)
//						.gender(Gender.MALE)
//						.age(23)
//						.job("asd")
//						.identifier("asd" + i).build());
//			}
//			Category category = Category.builder()
//					.name("asd")
//					.depth1("asdsad")
//					.mall("as")
//					.cid("asdasd")
//					.build();
//			categoryRepository.save(category);
//			for (int i = 0; i < 10; i++) {
//				bookRepository.save(new Book("asdsad" + i, "Asdadas" + i, category));
//			}
//			for (int i = 0; i < 10; i++) {
//				meetingRepository.save(Meeting.builder()
//						.title("asdasd")
//						.capacity(5)
//						.description("adasdas")
//						.book(bookRepository.findById(1L).get())
//						.build());
//			}
//		};
//	}
}
