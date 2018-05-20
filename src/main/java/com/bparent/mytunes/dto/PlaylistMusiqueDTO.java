package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.PlaylistMusique;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaylistMusiqueDTO extends EntityDTO<PlaylistMusique> {

    private Integer order;
    private MusiqueDTO musique;

    @Override
    public Class getEntityClass() {
        return PlaylistMusique.class;
    }
}
