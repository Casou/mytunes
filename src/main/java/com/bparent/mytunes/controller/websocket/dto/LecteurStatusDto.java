package com.bparent.mytunes.controller.websocket.dto;

import com.bparent.mytunes.dto.MusiqueDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LecteurStatusDto {
    private String status;
    private MusiqueDTO musique;
    private Integer time;
}
