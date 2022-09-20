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

}
