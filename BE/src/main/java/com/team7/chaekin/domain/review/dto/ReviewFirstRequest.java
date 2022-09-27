package com.team7.chaekin.domain.review.dto;

import lombok.Data;

import javax.validation.Valid;
import java.util.List;

@Data
public class ReviewFirstRequest {
    List<@Valid ReviewFirstDto> ratings;
}
