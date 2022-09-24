package com.team7.chaekin.domain.meeting.dto;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class MeetingCreateRequest {
    @PositiveOrZero(message = "Can't be minus value.")
    private long bookId;
    @NotBlank(message = "Can not be null or blank.")
    @Size(min=1, max = 100, message = "Must write at least one.")
    private String title;
    @NotBlank(message = "Can not be null or blank.")
    @Size(min=1, max = 2000, message = "Must write at least one.")
    private String description;
    @Min(2) @Max(6)
    private int maxCapacity;
}
