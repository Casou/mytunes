package com.bparent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UpdateClassementDTO {

    private MusiqueDTO musique;
    private Integer newClassement;

}
