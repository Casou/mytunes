package com.bparent.mytunes.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlaylistManagerDTO {

    private MusiqueDTO musiquePlaying;
    private List<MusiqueDTO> musiques;
    private PlaylistDTO playlist;
    private Boolean shuffle;
    private List<MusiqueDTO> history;

}
