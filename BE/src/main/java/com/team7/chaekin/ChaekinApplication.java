package com.team7.chaekin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
//					.keywords("asdasd")
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
