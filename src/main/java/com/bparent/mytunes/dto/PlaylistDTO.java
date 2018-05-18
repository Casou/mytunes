package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Playlist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    protected List<MusiqueDTO> musiques = new ArrayList<>();
    protected List<PlaylistDTO> children = new ArrayList<>();

    public static PlaylistDTO toDto(Playlist playlist) {
        ModelMapper mapper = new ModelMapper();
        PlaylistDTO dto = mapper.map(playlist, PlaylistDTO.class);
        if (playlist.getChildren() != null) {
            dto.children = playlist.getChildren().stream()
                    .map(PlaylistDTO::toDto)
                    .sorted((dto1, dto2) -> {
                        if (dto1.isFolder && !dto2.isFolder) { return 1; }
                        if (!dto1.isFolder && dto2.isFolder) { return -1; }
                        return dto1.getNom().compareTo(dto2.getNom());
                    })
                    .collect(Collectors.toList());
        }
        return dto;
    }

    @Override
    public Class getEntityClass() {
        return Playlist.class;
    }
}
