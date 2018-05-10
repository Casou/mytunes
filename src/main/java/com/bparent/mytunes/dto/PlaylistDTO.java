package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Playlist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaylistDTO extends EntityDTO<Playlist> {

    protected BigInteger id;
    protected Integer itunesId;
    protected String nom;
    protected Boolean isFolder = Boolean.FALSE;
    protected String persistentId;
    protected String parentPersistentId;
    protected List<MusiqueDTO> musiques;
//    protected Playlist parent;
//    protected List<Playlist> children = new ArrayList<>();

    public static PlaylistDTO toDto(Playlist playlist) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(playlist, PlaylistDTO.class);
    }

    @Override
    public Class getEntityClass() {
        return Playlist.class;
    }
}
