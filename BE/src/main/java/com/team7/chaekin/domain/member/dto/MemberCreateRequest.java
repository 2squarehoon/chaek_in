package com.team7.chaekin.domain.member.dto;

import com.team7.chaekin.domain.member.entity.Gender;
import com.team7.chaekin.domain.member.entity.Member;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.*;

@Data
public class MemberCreateRequest {

    @NotBlank
    @Email(message = "Must email format.")
    private String identifier;
    @NotBlank
    private String password;
    @NotBlank
    @Size(min = 1, max = 255, message = "Nickname's length is not valid.")
    private String nickname;
    @NotBlank
    @Size(min = 1, max = 45, message = "Job's length is not valid.")
    private String job;
    @Min(value = 1, message = "Age Value is not valid.")
    private int age;
    @NotNull(message = "Gender Can not be null.")
    private Gender gender;

    public Member toEntity() {
        return Member.builder()
                .identifier(identifier)
                .password(password)
                .nickname(nickname)
                .job(job)
                .age(age)
                .gender(gender)
                .build();
    }

    public void encryptPassword(PasswordEncoder passwordEncoder) {
        password = passwordEncoder.encode(password);
    }
}
